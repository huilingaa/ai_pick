<template>
    <div>
        <div id="kline" style="width: 900px;height:400px;position: relative;" ref='kline'></div>
    </div>
</template>

<script>
// #ifdef H5	
import HQChart from '../umychart_uniapp_h5/umychart.uniapp.h5.js'
// #endif

// #ifndef H5
import {JSCommon} from '../umychart.uniapp/umychart.wechat.3.0.js'
import {JSCommonHQStyle} from '../umychart.uniapp/umychart.style.wechat.js'
// #endif

var pako = require('pako');

function DefaultData() { }

DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type:'深度图',   //创建图形类型

        Symbol:'BTCBUSD.bit',
        IsAutoUpdate:false,       //是自动更新数据
        AutoUpdateFrequency:10000,   //数据更新频率
        //CorssCursorTouchEnd:true,
        EnableScrollUpDown:true,

        MaxVolRate:1.2,

        CorssCursorInfo: { HPenType:0, VPenType:1, IsShowTooltip:true },

        Border: //边框
        {
            Left:1,         //左边间距
            Right:40,       //右边间距
            Bottom:25,      //底部间距
            Top:1           //顶部间距
        },
		
		//框架设置
        Frame: { SplitCount:6, IsShowLeftText:false , XLineType:3},   
    };
 
    return data;
}

var g_KLine={ JSChart:null };

export default{
    name: 'DepthChart',
    data(){
        return{
            Symbol:'btcusdt.BIT', 
			OriginalSymbol:'btcusdt',
			ChartWidth:300,
			ChartHeight:600,
			KLine:
			{
				Option:DefaultData.GetKLineOption(), 
			},
			
			// WSUrl:'wss://api.xfilecache.com/ws',
            WSUrl: 'ws://p_hb_ws.ratafee.nl/', //实际转发到wss://api.huobi.pro/ws
			SocketOpen:false,
			LastSubString:null,     //最后一个订阅的数据
        }
    },
    mounted(){
        // var klineControl=new KLineChart(document.getElementById('kline'));
        // klineControl.Create();
        uni.getSystemInfo({
		    success:  (res) =>
			  {
				  var width=res.windowWidth;
				  var height=res.windowHeight;
				  this.ChartWidth=width - 30;
				  // this.ChartHeight=height-130;
				  this.$nextTick(()=>
				  {
					  // #ifdef H5
					  this.OnSize();
					  this.CreateKLineChart(); 
					  // #endif 
				  })
		    }
		});
    },
    methods:{
        OnSize()
		{
			// #ifdef H5
			this.OnSize_h5();
			// #endif
		},
		
		OnSize_h5()
		{
			var chartHeight = this.ChartHeight;
			var chartWidth = this.ChartWidth;
			 
			var kline=this.$refs.kline;
			kline.style.width=chartWidth+'px';
			kline.style.height=chartHeight+'px';
			if (g_KLine.JSChart) g_KLine.JSChart.OnSize();
		},
        CreateKLineChart()
		{
			// #ifdef H5
			this.CreateKLineChart_h5();
			// #endif
		},
        CreateKLineChart_h5()  //创建K线图
		{
		    if (g_KLine.JSChart) return;
			
			var blackStyle=HQChart.HQChartStyle.GetStyleConfig(HQChart.STYLE_TYPE_ID.BLACK_ID);
			blackStyle.FrameTitleBGColor = 'rgb(24,28,31)'
			console.log('hhh')
			console.log(blackStyle)
			blackStyle.TitleFont = '24px 微软雅黑'
			HQChart.JSChart.SetStyle(blackStyle);
			//this.$refs.kline.style.backgroundColor=blackStyle.BGColor;	//div背景色设置黑色
			
		    this.KLine.Option.Symbol=this.Symbol;
		    let chart=HQChart.JSChart.Init(this.$refs.kline);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
		    chart.SetOption(this.KLine.Option);
		    g_KLine.JSChart=chart;
		},
        NetworkFilter(data, callback){
            console.log("[KLineChart::NetworkFilter", data );
            switch(data.Name)
            {
                case "DepthChartContainer::RequestDepthData":
                    this.RequestDepthData(data, callback);
                    break;
            }
        },
        RequestDepthData(data, callback){
            data.PreventDefault=true;
            // var symbol=data.Request.Data.symbol;
            // var url = 'wss://api.huobi.pro/feed'
            //https://api.huobi.pro
            var url = 'http://api.huobi.pro/feed'
            var WSUrl = 'ws://p_hb_ws.ratafee.nl/market.btcusdt.BIT.depth'

            if(!this.SocketOpen){
                uni.connectSocket( {url: WSUrl} );//创建连接

                uni.onSocketOpen((event)=>
				{
					this.SocketOpen=true;
					console.log(event);
					// var message=JSON.stringify('test');
					uni.sendSocketMessage({data:'test'});
					// if (data.SendData.sub) this.LastSubString=data.SendData.sub;
				});
            }
            else{
                uni.sendSocketMessage({data:'test'});
            }

            uni.onSocketMessage((event)=>{
                console.log('kklll')
                console.log(event.data)
            })

            /*
            uni.request({
                url: url,
                data: {},
                success: (recvData)=>{
                    // var hqChartData = {}
                    // callback
                    console.log('res:')
                    console.log(recvData)
                },
                fail: (err)=>{}
            })
            */

            /*
            var url="深度图数据地址";
            $.ajax({
                url: url,
                type:"get",
                dataType: "json",
                async:true,
                success: (recvData)=>
                {
                    var hqChartData= { }; //TODO: 把接收到的数据装成hqchart格式给回调
                    callback(hqChartData);
                },
                error:(request)=>
                {
                        
                }
            });
            */
        }
    }
}
</script>

<style lang='scss' scoped></style>
