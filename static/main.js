let map;
const app = new Vue({
  el: '#app',
  data: {
    name: '',
    socket: null,
		position: {},
  },
  methods: {
    onChange(event) {
      this.socket.emit('leaveRoom', this.activeRoom);
      this.activeRoom = event.target.value;
      this.socket.emit('joinRoom', this.activeRoom);
    },

		sendMessage() {
			this.createMap()
      
		},
		positionChange() {
			const message = {
				name: this.name,
				text: this.text,
				position: this.position
			};
			this.socket.emit('positionToServer', message);
			this.text = '';
		},
		createMap() {
			AMapLoader.load({
				"key": "1e6da69a26b7d52fd2e35b3edc9ae071",              // 申请好的Web端开发者Key，首次调用 load 时必填
				"version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				"plugins": ['AMap.Scale'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				"AMapUI": {             // 是否加载 AMapUI，缺省不加载
						"version": '1.1',   // AMapUI 缺省 1.1
						"plugins":['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
				},
				"Loca":{                // 是否加载 Loca， 缺省不加载
						"version": '1.3.2'  // Loca 版本，缺省 1.3.2
				},
			}).then((AMap) => {
						const vm = this
						map = new AMap.Map('container');
						map.addControl(new AMap.Scale());
	
						AMap.plugin('AMap.Geolocation', function() {
							var geolocation = new AMap.Geolocation({
								// 是否使用高精度定位，默认：true
								enableHighAccuracy: true,
								// 设置定位超时时间，默认：无穷大
								timeout: 10000,
								// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
								buttonOffset: new AMap.Pixel(10, 20),
								//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
								zoomToAccuracy: true,     
								//  定位按钮的排放位置,  RB表示右下
								buttonPosition: 'RB'
							})
						
							geolocation.getCurrentPosition(function(status,result){
										if(status=='complete'){
												onComplete(result)
										}else{
												onError(result)
										}
							});
	
							map.addControl(geolocation);
	
						
							function onComplete(data) {
								console.log(data);
								vm.position = data.position
								vm.positionChange()
								
							}
						
							function onError (data) {
								// 定位出错
							}
						})
						
				
				
				
			
			
				}).catch((e)=>{
						console.error(e);  //加载错误提示
				}); 
		}
  },
  created() {
    this.socket = io('http://localhost:8020/map');
    this.socket.on('positionToClient', (message) => {
      
		});

    this.socket.on('connect', () => {
      
    });

    this.socket.on('joinedRoom', (room) => {
      
    });

    this.socket.on('leftRoom', (room) => {
      
    });
	},
	mounted() {
		  
	
	},
});
