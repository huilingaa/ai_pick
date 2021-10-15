<template>
	<div class='divchart' >
		<view class="menu">
            <view class="menu__item" @click.self="show_option='0'">
                D
                <image class="menu__item__img" src="../../../../../static/images/trade/ic_label@2x.png" />
				<view class="menu__item__disable" v-if="nowChart=='m'"></view>
            </view>
            <view class="menu__item" @click.self="show_option='1'">
                K line
                <image class="menu__item__img" src="../../../../../static/images/trade/ic_label@2x.png" />
            </view>
            <view class="menu__item" @click.self="show_option='2'">
                Indecator
                <image class="menu__item__img" src="../../../../../static/images/trade/ic_label@2x.png" />
				<view class="menu__item__disable" v-if="nowChart=='m'"></view>
            </view>
            <view class="menu__item menu__item--flex"></view>
            <view class="menu__item">
                <image class="menu__item__menuImg" src="../../../../../static/images/trade/ic_set@2x.png" />
            </view>
            <view class="menu__item">
                <image class="menu__item__menuImg" src="../../../../../static/images/trade/ic_zoom@2x.png" />
            </view>
        </view>

		<div class="select" :class="{'select--show':show_option}" @click="show_option=false">
			<div class="select__center" v-show="show_option=='0'">
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu">Min</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==4}"
						    @click="ChangePeriod(4)">
							1min
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==5}"
						    @click="ChangePeriod(5)">
							5min
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==6}"
						    @click="ChangePeriod(6)">
							15min
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==7}"
						    @click="ChangePeriod(7)">
							30min
						</div>
					</div>
				</div>
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu">Hour</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==8}"
							@click="ChangePeriod(8)">
							1h
						</div>
					</div>
				</div>
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu">Days</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.KLine.Period==0}"
						    @click="ChangePeriod(0)">
							1d
						</div>
					</div>
				</div>
			</div>
			<div class="select__center" v-show="show_option=='1'">
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu"
						    :class='{"select__item__menu--active":nowChart=="k"}'
						    @click="switchToKLine">
							Candles
						</div>
					</div>
					<!-- <div class="select__item">
						<div class="select__item__menu">Bars</div>
					</div> -->
					<div class="select__item">
						<div class="select__item__menu"
						    :class='{"select__item__menu--active":nowChart=="m"}'
						    @click="createMinuteLine">
							Line
						</div>
					</div>
					<!-- <div class="select__item">
						<div class="select__item__menu">Area</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu">Baseline</div>
					</div> -->
				</div>
				<!-- <div class="row">
					<div class="select__item">
						<div class="select__item__menu">Hollow Candles</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu">Heikin Ashi</div>
					</div>
				</div> -->
			</div>
			<div class="select__center" v-show="show_option=='2'">
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='MACD'}"
						    @click='ChangeIndecator("MACD")'>
							MACD
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='KDJ'}"
						    @click='ChangeIndecator("KDJ")'>
							KDJ
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='BOLL'}"
						    @click='ChangeIndecator("BOLL")'>
							BOLL
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='RSI'}"
						    @click='ChangeIndecator("RSI")'>
							RSI
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='OBV'}"
						    @click='ChangeIndecator("OBV")'>
							OBV
						</div>
					</div>
				</div>
				<div class="row">
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='VR'}"
						    @click='ChangeIndecator("VR")'>
							VR
						</div>
					</div>
					<div class="select__item">
						<div class="select__item__menu"
						    :class="{'select__item__menu--active':KLine.Option.Windows[1].Index=='CCI'}"
						    @click='ChangeIndecator("CCI")'>
							CCI
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!--  #ifdef  H5 -->
		<div>
			<div class='kline' id="kline" ref='kline'></div>
		</div>
		<!--  #endif -->
		
		<!--  #ifndef  H5 -->
		<view>
			<canvas id="kline2" canvas-id='kline2' class='kline2' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" 
			  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>
		</view>
		<!--  #endif -->
		
		<!-- <div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangePeriod(0)">日线</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangePeriod(1)">周线</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangePeriod(4)">1分钟</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangePeriod(6)">15分钟</button>
		</div> -->
		
		<!-- <div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('btcusdt')">btcusdt</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('ethusdt')">ethusdt</button>
		</div> -->
		
	</div>
</template>

<script>
import {mixinMinuteLine} from './mixinMinuteLine'

// #ifdef H5	
import HQChart from '../umychart_uniapp_h5/umychart.uniapp.h5.js'
// #endif

// #ifndef H5
import {JSCommon} from '../umychart.uniapp/umychart.wechat.3.0.js'
import {JSCommonHQStyle} from '../umychart.uniapp/umychart.style.wechat.js'
// #endif

var pako = require('pako');

import { mapActions } from 'vuex'

function DefaultData() { }

DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type: '历史K线图', //历史K线图
        
        Windows: //窗口指标
        [
            {Index:"MA",Modify: false, Change: false}, 
            {Index:"MACD",Modify: false, Change: true}
        ], 
 
		IsAutoUpdate:false,           //是自动更新数据(不自动更新由外部更新)
        IsApiPeriod:true,             //使用Api计算周期
        IsCorssOnlyDrawKLine:true,
        CorssCursorTouchEnd:true,
 
        Border: //边框
        {
            Left:   1,
            Right:  1, //右边间距
            Top:    25,
            Bottom: 25,
        },
 
        KLine:
        {
            Right:1,                            //复权 0 不复权 1 前复权 2 后复权
            Period:0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
            PageSize:30,
            IsShowTooltip:false
        },
		
		Frame:  //子框架设置
		[
			{   
				SplitCount:3,IsShowLeftText:false, SplitType:1,
				Custom: [ { Type:0, Position:'right' } ]
			},

			{SplitCount:2,IsShowLeftText:false, SplitType:1 },
			{SplitCount:2,IsShowLeftText:false}
		],
		
		ExtendChart:
		[
			{Name:'KLineTooltip' },	//开启手机端tooltip
		],
        
    };
 
    return data;
}

var g_KLine={ JSChart:null };

//周期枚举
var KLINE_PERIOD_ID=
{
    KLINE_DAY_ID:0,            //日线
    KLINE_WEEK_ID:1,           //周线
    KLINE_MONTH_ID:2,          //月线
    KLINE_YEAR_ID:3,           //年线

    KLINE_MINUTE_ID:4,         //1分钟
    KLINE_5MINUTE_ID:5,        //5分钟
    KLINE_15MINUTE_ID:6,       //15分钟
    KLINE_30MINUTE_ID:7,       //30分钟
    KLINE_60MINUTE_ID:8        //60分钟
}

export default
{
	mixins: [mixinMinuteLine],
	data() 
	{
		let data=
		{
			Symbol:'btcusdt.BIT',
			OriginalSymbol:'btcusdt',
			// Symbol:'ethusdt.BIT',
			// OriginalSymbol:'ethusdt',
			ChartWidth:300,
			ChartHeight:600,
			KLine:
			{
				Option:DefaultData.GetKLineOption(), 
			},
			
			// WSUrl:'wss://api.xfilecache.com/ws',
            WSUrl: 'ws://p_hb_ws.ratafee.nl/', //实际转发到wss://api.huobi.pro/ws
			// market.$symbol.depth.$type  ws://p_hb_ws.ratafee.nl/market.btcusdt.BIT
			// WSUrl: 'ws://p_hb_ws.ratafee.nl/market.btcusdt.BIT',
			SocketOpen:false,
			LastSubString:null,     //最后一个订阅的数据

			show_option: false,

			nowChart: 'k' //'k'k线图，'m'分时图
		};
		
		return data;
	},
	
	name:'KLine',

    mounted(){
		uni.closeSocket()
		{
            HQChart.JSConsole.Chart.Log=function() { }    //不输出图形日志
            HQChart.JSConsole.Complier.Log=function() { }	//不输出指标脚本执行日志
        }
		uni.getSystemInfo({
		    success:  (res) =>
			  {
				  var width=res.windowWidth;
				  var height=res.windowHeight;
				  this.ChartWidth=width - 30;
				//   this.ChartHeight=height;
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
	
	onLoad() 
	{
		// #ifdef H5
		this.OnSize();
		this.CreateKLineChart(); 
		// #endif
	},
	
	onReady()
	{	
		console.log("[KLineChart::onReady]");
		// #ifdef H5
		this.OnSize();
		this.CreateKLineChart(); 
		// #endif
	},
	
	onShow()
	{
		console.log("[KLineChart::onShow]");
		// #ifndef H5
		this.OnSize();
		this.CreateKLineChart(); 
		// #endif
	},
	
	onHide()
	{
		if (g_KLine.JSChart)
		{
			g_KLine.JSChart.StopAutoUpdate();
			g_KLine.JSChart=null;
		}
	},
	
	onUnload()
	{
		if (g_KLine.JSChart)
		{
			g_KLine.JSChart.StopAutoUpdate();
			g_KLine.JSChart=null;
		}
	},

	destroyed(){
		uni.closeSocket()
		this.SocketOpen = null
	},
	
	methods:
	{
		//对外接口
		ChangePeriod(period)  //周期切换
		{
			//var symbol=this.Symbol;
			g_KLine.JSChart.ChangePeriod(period);
			this.KLine.Option.KLine.Period = period
			console.log(this.KLine.Option.KLine.Period)
		},
		
		ChangeSymbol(symbol)   //切换股票
		{
			if (this.OriginalSymbol==symbol) return;

			this.OriginalSymbol=symbol
			this.Symbol=symbol+'.BIT'

			this.SymbolM = symbol+'.BIT'
            this.OriginalSymbolM = symbol

			if(this.nowChart=='k'){
				g_KLine.JSChart.ChangeSymbol(this.Symbol)
			}else{
				//分时图切换股票
				console.log
				this.ChangeSymbolM(symbol)
			}
		},

		ChangeIndecator(name)  //切换指标
		{
			// #ifdef H5
			this.KLine.Option.Windows[1].Index = name
			g_KLine.JSChart.ChangeIndex(1,name)
			// #endif
		},
				
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
				
		CreateKLineChart_h5()  //创建K线图
		{
		    if (g_KLine.JSChart) return;
			
			var blackStyle=HQChart.HQChartStyle.GetStyleConfig(HQChart.STYLE_TYPE_ID.BLACK_ID);
			blackStyle.FrameTitleBGColor = 'rgb(24,28,31)'
			blackStyle.TitleFont = '20px 微软雅黑'

			//K线颜色
    		blackStyle.UpBarColor='rgb(37,175,142)';   			//K线上涨柱子颜色
    		blackStyle.UpTextColor= blackStyle.UpBarColor;		//上涨价格颜色
    		blackStyle.DownBarColor='rgb(210,73,99)';			//K线下跌柱子颜色
    		blackStyle.DownTextColor=blackStyle.DownBarColor;	//下跌价格颜色

			HQChart.JSChart.SetStyle(blackStyle);
			//this.$refs.kline.style.backgroundColor=blackStyle.BGColor;	//div背景色设置黑色

		    this.KLine.Option.Symbol=this.Symbol;
		    let chart=HQChart.JSChart.Init(this.$refs.kline);
			this.KLine.Option.NetworkFilter=this.NetworkFilter;
		    chart.SetOption(this.KLine.Option);
		    g_KLine.JSChart=chart;
		},
		
		CreateKLineChart_app()
		{
			if (g_KLine.JSChart) return;
			
			let element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'kline2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
			
			//var blackStyle=JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
			//JSCommon.JSChart.SetStyle(blackStyle);
					
			g_KLine.JSChart = JSCommon.JSChart.Init(element);
			this.KLine.Option.NetworkFilter=(data, callback)=>{ this.NetworkFilter(data, callback); };
			this.KLine.Option.Symbol=this.Symbol;
			this.KLine.Option.IsClickShowCorssCursor=true;
			this.KLine.Option.IsFullDraw=true; 	//每次手势移动全屏重绘
			g_KLine.JSChart.SetOption(this.KLine.Option);
		},
		
		CreateKLineChart()
		{
			// #ifdef H5
			this.CreateKLineChart_h5();
			// #endif
			
			// #ifndef H5
			this.CreateKLineChart_app();
			// #endif
		},
		
		NetworkFilter(data, callback)
		{
			console.log('[KLineChart::NetworkFilter] data', data);
			switch(data.Name)
			{
				case 'KLineChartContainer::ReqeustHistoryMinuteData':   //分钟全量数据下载
					this.RequestHistoryMinuteData(data, callback);
					break;
				case 'KLineChartContainer::RequestFlowCapitalData':     //数字货币不会调用
					this.RequestFlowCapitalData(data, callback);
					break;
				case 'KLineChartContainer::RequestHistoryData':         //日线全量数据下载
					this.RequestHistoryData(data,callback);
					break;
			}
		},
		
		//
		//WS
		//心跳包
		SendWSHeartMessage()
		{
			if (this.SocketOpen)
			{
				var pong = {'pong': new Date().getTime()};
				var message=JSON.stringify(pong);
				uni.sendSocketMessage({data:message});
			}
		},

		//取消订阅上一次的信息
		SendUnSubscribeMessage()
		{
			if (!this.LastSubString || !this.SocketOpen)  return;
 
			var message=JSON.stringify({unsub:this.LastSubString}); //取消上次订阅的信息
			uni.sendSocketMessage({data:message});
			this.LastSubString=null;    //清空最后一个订阅信息
		},
		
		RequestWSData(data, recvCallback)
		{
			if (!this.SocketOpen) 
			{
				uni.connectSocket( {url:this.WSUrl} );//创建连接

				uni.onSocketOpen((event)=>
				{
					this.SocketOpen=true;
					console.log(event);
					var message=JSON.stringify(data.SendData);
					// console.log('mm:')
					// console.log(message)
					uni.sendSocketMessage({data:message});
					if (data.SendData.sub) this.LastSubString=data.SendData.sub;
				});
			}
			else
			{
				this.SendUnSubscribeMessage();
				var message=JSON.stringify(data.SendData);
				uni.sendSocketMessage({data:message});
				// console.log('medd')
				// console.log(message)
				if (data.SendData.sub) this.LastSubString=data.SendData.sub;    //保存最后一个订阅信息
			}

			uni.onSocketMessage((event)=>
			{
				let ploydata = new Uint8Array(event.data);
				let msg = pako.inflate(ploydata, {to: 'string'});
				// console.log("[KLineChart::RequestWSData] recv ", msg);
				var recvData=JSON.parse(msg);
				// console.log('hhhhhhhhhhh')
				// console.log(recvData)
				if (recvData.ping)
				{
					this.SendWSHeartMessage();  //回复服务器心跳包
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

			uni.onSocketError((evnet)=>
			{
				console.log(event);
			});
			
		},
		
		//生成请求数据
		GeneratePostData(symbol, period)
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
		RequestHistoryMinuteData(data, callback)  
		{
			data.PreventDefault=true;
			var symbol=data.Request.Data.symbol;
			var period=data.Self.Period;    //周期

			var postData=this.GeneratePostData(this.OriginalSymbol,period);

			var obj={ SendData:postData.Req , Symbol:symbol, OriginalSymbol:this.OriginalSymbol, Period:period, Callback:callback };

			this.RequestWSData(obj, (recvData,data)=>{ this.RecvHistoryMinuteData(recvData,data); });
		},
		
		//接收历史分钟数据
		RecvHistoryMinuteData(recvData, data)   
		{
			if (recvData.rep!=data.SendData.req) return;

			var hqChartData={code:0, data:[]};
			hqChartData.symbol=data.Symbol;
			hqChartData.name=data.OriginalSymbol;

			if (recvData.data)
			{
				var yClose=null; //前收盘
				for(var i in recvData.data)
				{
					var item=recvData.data[i];

					//时间戳转换
					var dateTime = new Date();
					dateTime.setTime(item.id*1000);
					var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
					var time=dateTime.getHours()*100+dateTime.getMinutes();

					var newItem=[ date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time ];

					yClose=item.close;
					hqChartData.data.push(newItem);
				}
			}
			
			// #ifdef H5
			data.Callback(hqChartData);
			// #endif
			
			// #ifndef H5
			data.Callback({data: hqChartData});
			// #endif
			
			this.SubscribeMinuteRealtimeData(data);
		},
		
		//订阅最新分钟K线数据
		SubscribeMinuteRealtimeData(data)   
		{
			//订阅最新数据
			var postData=this.GeneratePostData(data.OriginalSymbol,data.Period);
			var obj={SendData:postData.Sub, Symbol:data.Symbol, OriginalSymbol:data.OriginalSymbol, Period:data.Period };

			this.RequestWSData(obj, (recvData,data)=>{ this.RecvMinuteRealtimeData(recvData,data); });
		},
		
		RecvMinuteRealtimeData(recvData,data)
		{
			if (recvData.ch!=data.SendData.sub) return;

			var internalChart=g_KLine.JSChart.JSChartContainer;
			var period=internalChart.Period;
			var symbol=internalChart.Symbol;
			if (symbol!=data.Symbol || period!=data.Period) return;

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
			var newItem=[ date,null, item.open, item.high, item.low, item.close, item.vol, item.amount, time ];

			hqChartData.data.push(newItem);

			// #ifdef H5
			internalChart.RecvMinuteRealtimeData(hqChartData);
			// #endif
			
			// #ifndef H5
			internalChart.RecvMinuteRealtimeData({data: hqChartData});
			// #endif
		},
		
		//日K数据下载
        RequestHistoryData(data,callback) 
        {
            data.PreventDefault=true;
            var symbol=data.Request.Data.symbol;
            var period=data.Self.Period;    //周期
            var postData=this.GeneratePostData(this.OriginalSymbol,period);

            var obj={ SendData:postData.Req , Symbol:symbol, OriginalSymbol:this.OriginalSymbol, Period:period, Callback:callback };

            this.RequestWSData(obj, (recvData,data)=>{ this.RecvHistoryData(recvData,data); });
        },

		//接收到日线数据 转化成hqchart格式数据
        RecvHistoryData(recvData,data){
            if (recvData.rep!=data.SendData.req) return;

            var hqChartData={code:0, data:[]};
            hqChartData.symbol=data.Symbol;
            hqChartData.name=data.OriginalSymbol;

            if (recvData.data)
            {
                var yClose=null; //前收盘
                for(var i in recvData.data)
                {
                    var item=recvData.data[i];

                    //时间戳转换
                    var dateTime = new Date();
                    dateTime.setTime(item.id*1000);
                    var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
                    var time=dateTime.getHours()*100+dateTime.getMinutes();

                    var newItem=[ date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount];

                    yClose=item.close;
                    hqChartData.data.push(newItem);
                }
            }

			// #ifdef H5
            data.Callback(hqChartData);
			// #endif
			
			// #ifndef H5
			data.Callback({data: hqChartData});
			// #endif

            this.SubscribRealtimeData(data);
        },

        //订阅最新日K线数据
        SubscribRealtimeData(data)   
        {
            //订阅最新数据
            var postData=this.GeneratePostData(data.OriginalSymbol,data.Period);

            var obj={SendData:postData.Sub, Symbol:data.Symbol, OriginalSymbol:data.OriginalSymbol, Period:data.Period };

            this.RequestWSData(obj, (recvData,data)=>{ this.RecvRealtimeData(recvData,data); });
        },

        RecvRealtimeData(recvData,data)
        {
            if (recvData.ch!=data.SendData.sub) return;

            var internalChart=g_KLine.JSChart.JSChartContainer;
            var period=internalChart.Period;
            var symbol=internalChart.Symbol;
            if (symbol!=data.Symbol || period!=data.Period) return;

            var hqChartData={code:0, stock:[]};
            //TODO:把recvData => hqchart内部格式 格式看教程
            //HQChart使用教程30-K线图如何对接第3方数据14-轮询增量更新日K数据

            var stock={symbol:data.Symbol, name:data.OriginalSymbol};
            var item=recvData.tick;
            var dateTime = new Date();
            dateTime.setTime(item.id*1000);
            var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
            var time=dateTime.getHours()*100+dateTime.getMinutes();

            stock.date=date;
            stock.yclose=null;
            stock.open=item.open;
            stock.high=item.high;
            stock.low=item.low;
            stock.price=item.close;
            stock.vol=item.vol;
            stock.amount=item.amount;

            hqChartData.stock.push(stock);

			// #ifdef H5
            internalChart.RecvRealtimeData(hqChartData);
			// #endif
			
			// #ifndef H5
			internalChart.RecvRealtimeData({data: hqChartData});
			// #endif
        },

		///
		//手势事件 app/小程序才有
		//KLine事件
		KLineTouchStart: function (event) 
		{
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
		},
		
		KLineTouchMove: function (event) 
		{
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
		},
		
		KLineTouchEnd: function (event) 
		{
		  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
		},

		...mapActions('priceStore',['setPrice']),

		ClearChart(){
			if(g_KLine.JSChart){
				g_KLine.JSChart.ChartDestory()
				g_KLine.JSChart = null
			}
			// #ifdef H5
			let divKLine = document.getElementById('kline')
			while(divKLine.hasChildNodes()){
				divKLine.removeChild(divKLine.lastChild)
			}
			// #endif
		},

		createMinuteLine(){
			console.log('createMinuteLine')
			this.nowChart = 'm'

			this.ClearChart()
			uni.closeSocket()
			this.SocketOpen = null
			this.CreateMinuteChartM();
		},

		// 从分时图切换至K线图
		switchToKLine(){
			console.log('switchToKLine')
			this.nowChart = 'k'

			this.ClearChartM()
			this.CreateKLineChart()
		}
	}
}
</script>

<style lang='scss' scoped>
.menu{
    height: 80rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #1D262B;
    border-bottom: 1rpx solid #1D262B;
    display: flex;
    &__item{
        height: 100%;
        font-size: 28rpx;
        color: #6B757B;
        box-sizing: border-box;
        padding: 0 30rpx;
        box-sizing: border-box;
        border-right: 1rpx solid #1D262B;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
		position: relative;
        &--flex{
            flex: 1;
        }
        &__img{
            position: absolute;
            right: 0;
            bottom: 0;
            width: 6rpx;
            height: 6rpx;
        }
        &__menuImg{
            width: 40rpx;
            height: 40rpx;
        }
		&__disable{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(255,255,255,0.1);
		}
    }
}
.select{
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.3);
	z-index: 993;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateY(-100%);
	opacity: 0;
	transition: opacity 0.3s linear 0s, transform 0s linear 0.3s;
	&--show{
		transform: translateY(0);
		opacity: 1;
		transition: transform 0s , opacity 0.3s linear 0.1s;
	}
	&__center{
		width: 100%;
		background: #282E33;
		box-sizing: border-box;
		padding: 0 30rpx;
		.row{
			height: 120rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #1D262B;
			display: flex;
			align-items: center;
			.select__item{
				min-width: 20%;
				display: flex;
				justify-content: center;
				&__menu{
					height: 60rpx;
					font-size: 28rpx;
					color: #A6B5BE;
					border-radius: 10rpx;
					line-height: 60rpx;
					min-width: 120rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					&--active{
						background: #20262A;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
