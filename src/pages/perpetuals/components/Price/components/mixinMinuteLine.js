// #ifdef H5
import HQChart from '../umychart_uniapp_h5/umychart.uniapp.h5.js'
// #endif
import pako from 'pako'

function DefaultDataM() { }

DefaultDataM.GetMinuteOption=function()
{
    var option= 
    {
        Type:'分钟走势图',   //创建图形类型

        Windows: //窗口指标
        [
            // {Index:"MACD"},
        ], 
        
        IsAutoUpdate:false,             //是自动更新数据
        DayCount:1,                     //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:true,           //是否显示右键菜单
    
        MinuteLine:
        {
            IsDrawAreaPrice:false,      //是否画价格面积图
            IsShowAveragePrice:false,   //不显示均线
        },
    
        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,     //右边间距
            Top:25,
            Bottom:25
        },
                
        Frame:  //子框架设置
        [
            {SplitCount:5,Height:30},
            {SplitCount:4,Height:10},
        ],

        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ],

        EnableScrollUpDown: true
        
    }

    return option;
}

export const mixinMinuteLine = {
    data(){
        return {
            // mData: {
                SymbolM:'btcusdt.BIT', 
                OriginalSymbolM:'btcusdt',

                ChartM:null,   //图形控件
                OptionM:DefaultDataM.GetMinuteOption(),        //设置

                // WSUrl:'wss://api.xfilecache.com/ws',
			    WSUrlM: 'ws://p_hb_ws.ratafee.nl/',
                SocketM:null,
                LastSubStringM:null,     //最后一个订阅的数据
                StockDataM:null,         //缓存所有显示的数据
                DateTimeRangeM:null,     //交易时间段
                XCoordinateDataM:null,   //x轴信息
            // }
        }
    },
    created(){
        var log = this.GetURLParamsM('log');
        {
            HQChart.JSConsole.Chart.Log=function() { }    //不输出图形日志
            HQChart.JSConsole.Complier.Log=function() { }	//不输出指标脚本执行日志
        }

        //处理默认传入的参数
        if (this.DefaultSymbolM) 
        {
            this.OriginalSymbolM=this.DefaultSymbolM; //默认股票
            this.SymbolM=this.OriginalSymbolM+".BIT";
        }
    },
    mounted(){
        window.onresize = ()=>{ this.OnSizeM() }
        this.OnSizeM();              //子组件的mounted在父组件的mounted之前执行了  
        // this.CreateMinuteChartM();
        return
    },
    methods: {
        //
        //对外接口
        ChangePeriodM(period)  //周期切换
        {
            //var symbol=this.Symbol;
            this.ChartM.ChangePeriod(period);
        },

        ChangeIndexM(windowIndex,name) //切换指标  windowIndex=窗口索引, name=指标名字
        {
            this.ChartM.ChangeIndex(windowIndex,name);
        },

        ChangeSymbolM(symbol)   //切换股票
        {
            // if (this.OriginalSymbolM==symbol) return;

            this.OriginalSymbolM=symbol;
            this.SymbolM=symbol+'.BIT';
            this.ChartM.ChangeSymbol(this.SymbolM);
        },

        DestroyM()  //页面关闭的时候 销毁hqchart实例 和 ws连接
        {
            if (this.ChartM) this.ChartM.StopAutoUpdate();
            if (this.SocketM) this.SocketM.close();

            this.ChartM=null;
            this.SocketM=null;
        },

        ///
        //内部接口

        GetURLParamsM:function(name) 
        {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },

        OnSizeM()
        {
            /*
            var app=this.$refs.app;
            var height= app.offsetHeight;
            var width = app.offsetWidth;
            console.log(`[MinuteChart::OnSize] width=${width} height=${height}`);

            //获取屏幕大小 动态设置K线的div大小
            var kline=this.$refs.kline;
            kline.style.width=width+'px';
            kline.style.height=(height-90)+'px';

            if (this.ChartM) this.ChartM.OnSize();
            */
            uni.getSystemInfo({
                success:  (res) =>
                  {
                      var width=res.windowWidth;
                      var height=res.windowHeight;
                      
                      //获取屏幕大小 动态设置K线的div大小
                      var kline=this.$refs.kline;
                      kline.style.width=width+'px';
                      kline.style.height=(width+20)+'px';

                     if (this.ChartM) this.ChartM.OnSize();
                  }
            })
        },

       //创建走势图
        CreateMinuteChartM()
        {
            this.CreateDateTimeRangeM();

            HQChart.JSChart.GetMinuteTimeStringData().CreateBITData=()=>{ return this.CreateBITDataIndexM(); }              //当天所有的交易时间点
            HQChart.JSChart.GetMinuteCoordinateData().GetBITData=(upperSymbol)=> { return this.XCoordinateDataM; }          //X轴刻度

            if (this.ChartM) return;
            
            // /*
            //黑色风格
            var blackStyle=HQChart.HQChartStyle.GetStyleConfig(HQChart.STYLE_TYPE_ID.BLACK_ID);
			blackStyle.FrameTitleBGColor = 'rgb(24,28,31)'
			blackStyle.TitleFont = '20px 微软雅黑'

			//K线颜色
    		blackStyle.UpBarColor='rgb(37,175,142)';   			//K线上涨柱子颜色
    		blackStyle.UpTextColor= blackStyle.UpBarColor;		//上涨价格颜色
    		blackStyle.DownBarColor='rgb(210,73,99)';			//K线下跌柱子颜色
    		blackStyle.DownTextColor=blackStyle.DownBarColor;	//下跌价格颜色

			HQChart.JSChart.SetStyle(blackStyle);
            // */

            //局部修改颜色
            //var resource=HQChart.JSChart.GetResource(); //获取全局资源
            //resource.FrameSplitTextFont='30px 微软雅黑';

            let chart=HQChart.JSChart.Init(this.$refs.kline);
            this.OptionM.Symbol=this.SymbolM;
            this.OptionM.NetworkFilter=this.NetworkFilterM;
            chart.SetOption(this.OptionM);
            this.ChartM=chart;

            //HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus=(symbol)=> { return 2; }
        },

        NetworkFilterM(data, callback)
        {
            console.log('[MinuteChart::NetworkFilter] data', data);
            switch(data.Name)
            {
                case 'MinuteChartContainer::RequestMinuteData':         //当天分钟全量数据下载
                    this.RequestMinuteDataM(data, callback);
                    break;
            }
        },

        //心跳包
        SendWSHeartMessageM()
        {
            if (this.SocketM)
            {
                var pong = {'pong': new Date().getTime()};
                this.SocketM.send(JSON.stringify(pong));
            }
        },

        //取消订阅上一次的信息
        SendUnSubscribeMessageM()
        {
            if (!this.LastSubStringM || !this.SocketM)  return;
 
            var message=JSON.stringify({unsub:this.LastSubStringM}); //取消上次订阅的信息
            this.SocketM.send(message);
            this.LastSubStringM=null;    //清空最后一个订阅信息
        },

        RequestWSDataM(data, recvCallback)
        {
            if (!this.SocketM) 
            {
                this.SocketM=  new WebSocket(this.WSUrlM); //创建连接
                this.SocketM.onopen=(event)=>
                {
                    console.log(event);
                    var message=JSON.stringify(data.SendData);
                    this.SocketM.send(message);
                    if (data.SendData.sub) this.LastSubStringM=data.SendData.sub;
                }
            }
            else
            {
                this.SendUnSubscribeMessageM();
                var message=JSON.stringify(data.SendData);
                this.SocketM.send(message);
                if (data.SendData.sub) this.LastSubStringM=data.SendData.sub;    //保存最后一个订阅信息
            }

            this.SocketM.onmessage=(event)=>
            { 
                var reader = new FileReader();
                reader.addEventListener("loadend", (e) =>
                {
                    //console.log(e);
                    let ploydata = new Uint8Array(e.target.result);
                    let msg = pako.inflate(ploydata, {to: 'string'});
                    //console.log("[KLineChart::RequestWSData] recv ws data ",msg)
                    var recvData=JSON.parse(msg);
                    if (recvData.ping)
                    {
                        this.SendWSHeartMessageM();  //回复服务器心跳包
                    }
                    else if (recvData.unsubbed) //取消订阅成功
                    {

                    }
                    else if (recvData.subbed)   //订阅成功 
                    {

                    }
                    else
                    {
                        recvCallback(recvData, data); 
                    }
                });

                reader.readAsArrayBuffer(event.data,"utf-8");
            };

            this.SocketM.onerror=(evnet)=>
            {
                console.log(event);
            }
            
        },

        //生成请求数据
        GeneratePostDataM(symbol, period)
        {
            //1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon
            var MAP_PERIOD=new Map([
                [4,'1min'],
                [5,'5min'],
                [6,"15min"],
                [0,'1day'],
                [1,'1week'],
                [2,'1mon'],
            ]);

            var strPeriod=MAP_PERIOD.get(period);

            var reqData=
            {
                req: `market.${symbol}.kline.${strPeriod}`,
                symbol: symbol,
                period: strPeriod
            };

            var subData=
            {
                sub: `market.${symbol}.kline.${strPeriod}`,
                symbol: symbol,
                period: strPeriod
            };

            return { Req:reqData ,Sub:subData };
        },

        //请求分钟历史数据
        RequestMinuteDataM(data, callback)  
        {
            data.PreventDefault=true;
            var symbol=data.Request.Data.symbol[0];
            var period=4;   //1分钟周期的数据
            var postData=this.GeneratePostDataM(this.OriginalSymbolM,period);  

            var obj={ SendData:postData.Req , Symbol:symbol, OriginalSymbol:this.OriginalSymbolM, Period:period, Callback:callback };

            this.RequestWSDataM(obj, (recvData,data)=>{ this.RecvMinuteDataM(recvData,data); });
        },

        //接收历史分钟数据
        RecvMinuteDataM(recvData, data)   
        {
            if (recvData.rep!=data.SendData.req) return;

            //数据格式详见教程
            //HQChart使用教程29-走势图如何对接第3方数据2-最新分时数据
            //https://blog.csdn.net/jones2000/article/details/100149703
            var stock={ symbol:data.Symbol, name:data.OriginalSymbol, minute:[] };
            var hqChartData={ code:0, stock:[stock] };
            
            if (recvData.data)
            {
                var yClose=null; //前收盘
                var bFindFirst=false;

                var yClose=null, open=null;
                for(var i in recvData.data)
                {
                    var item=recvData.data[i];
                    if (open==null) open=item.open;
                    if (yClose==null)  yClose=item.close;

                    //时间戳转换
                    var dateTime = new Date();
                    dateTime.setTime(item.id*1000);
                    var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                    var time=dateTime.getHours()*100+dateTime.getMinutes();
                    if (date==this.DateTimeRangeM.Start.Date && time==this.DateTimeRangeM.Start.Time) 
                    {
                        bFindFirst=true;
                        open=item.open;
                    }
                    else
                    {
                        yClose=item.close;  //上一天的收盘价
                    }
                    
                    if (!bFindFirst) continue;

                    var minuteItem=
                    { 
                        date:date, time:time, 
                        open:item.open, high:item.high, low:item.low, price:item.close,
                        vol:item.vol, amount:item.amount
                    };

                    stock.date=date;
                    stock.time=time;
                   
                    stock.minute.push(minuteItem);
                }

                stock.yclose=yClose;
                stock.open=open;
            }
            this.StockDataM=stock;

            data.Callback(hqChartData);

            this.SubscribeMinuteRealtimeDataM(data);
        },

        //订阅最新分钟K线数据
        SubscribeMinuteRealtimeDataM(data)   
        {
            //订阅最新数据
            var postData=this.GeneratePostDataM(data.OriginalSymbol,data.Period);
            var obj={SendData:postData.Sub, Symbol:data.Symbol, OriginalSymbol:data.OriginalSymbol, Period:data.Period };

            this.RequestWSDataM(obj, (recvData,data)=>{ this.RecvMinuteRealtimeDataM(recvData,data); });
        },

        RecvMinuteRealtimeDataM(recvData,data)
        {
            if(!this.ChartM){return}
            if (recvData.ch!=data.SendData.sub) return;
            if (!this.StockDataM) return;

            var internalChart=this.ChartM.JSChartContainer;
            var period=internalChart.Period;
            var symbol=internalChart.Symbol;
            if (symbol!=data.Symbol) return;

            var hqChartData={code:0, data:[], ver:2.0}; //更新数据使用2.0版本格式
            hqChartData.symbol=data.Symbol;
            hqChartData.name=data.OriginalSymbol;

            //TODO:把recvData => hqchart内部格式 格式看教程
            //HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

            var item=recvData.tick;

            var dateTime = new Date();
            dateTime.setTime(item.id*1000);
            var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
            var time=dateTime.getHours()*100+dateTime.getMinutes();

            var minuteItem=
            { 
                date:date, time:time, 
                open:item.open, high:item.high, low:item.low, price:item.close,
                vol:item.vol, amount:item.amount
            };

            if (this.StockDataM.minute.length>0)
            {
                var lastItem=this.StockDataM.minute[this.StockDataM.minute.length-1];
                if (lastItem.date==minuteItem.date && lastItem.time==minuteItem.time)
                {
                    this.StockDataM.minute[this.StockDataM.minute.length-1]=minuteItem;
                }
                else
                {
                    this.StockDataM.minute.push(minuteItem);
                }
            }

            var hqChartData={ code:0, stock:[this.StockDataM] };

            internalChart.RecvMinuteData(hqChartData);
        },
        
        //坐标 刻度设置

        CreateDateTimeRangeM()
        {
            var date=new Date();
            var t=date.getTime();
            date.setTime(t-1000*60*60*2);
            var startTime=date.getHours()*100;
            var startDate=date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();

            date.setTime(t+1000*60*60*(24-3));
            var endTime=date.getHours()*100+59;
            var endDate=date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();

            const TIME_SPLIT=           
            [
                { Start:startTime, End:2359 },
                { Start:0,  End:endTime },
            ];

            var indexData=HQChart.JSChart.GetMinuteTimeStringData().CreateTimeData(TIME_SPLIT);
            this.DateTimeRangeM= { 
                Start:{ Time:startTime, Date:startDate }, 
                End:{ Time:endTime, Date:endDate }, 
                Count:indexData.length 
            };

            console.log("[MinuteChart::CreateDateTimeRange] Datetime range ", this.DateTimeRangeM);

            var xCoordinateData=
            {
                Count: this.DateTimeRangeM.Count,
                MiddleCount: parseInt(this.DateTimeRangeM.Count/2),
                Full:[],
                Simple:[],
                Min:[],
                GetData: function (width) 
                {
                    if (width < 200) return this.MinM;
                    else if (width < 450) return this.SimpleM;

                    return this.FullM;
                }
            }

            for(var i=0; i<indexData.length; ++i)
            {
                if (i%(60*2)==0)    //2小时一个刻度
                {
                    var value=indexData[i];
                    xCoordinateData.Full.push([parseInt(i), 1, "RGB(200,200,200)", HQChart.IFrameSplitOperator.FormatTimeString(value)]);
                }

                if (i%(60*4)==0)       //4小时一个刻度
                {
                    var value=indexData[i];
                    xCoordinateData.Simple.push([parseInt(i), 1, "RGB(200,200,200)", HQChart.IFrameSplitOperator.FormatTimeString(value)]);
                }

                if (i%(60*6)==0)    //6小时一个刻度
                {
                    var value=indexData[i];
                    xCoordinateData.Min.push([parseInt(i), 1, "RGB(200,200,200)", HQChart.IFrameSplitOperator.FormatTimeString(value)]);
                }
            }

            this.XCoordinateDataM= xCoordinateData;
        },

        CreateBITDataIndexM()
        {
            const TIME_SPLIT=           
            [
                { Start:this.DateTimeRangeM.Start.Time, End:2359 },
                { Start:0,  End:this.DateTimeRangeM.End.Time },
            ];

            return HQChart.JSChart.GetMinuteTimeStringData().CreateTimeData(TIME_SPLIT);;
        },

        ClearChartM(){
			if(this.ChartM){
				this.ChartM.ChartDestory()
                uni.closeSocket()
				this.ChartM = null
			}
			// #ifdef H5
			let divKLine = document.getElementById('kline')
			while(divKLine.hasChildNodes()){
				divKLine.removeChild(divKLine.lastChild)
			}
			// #endif
		}
    }
}
