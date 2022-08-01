//防抖
function debounce(method, delay) {
  let timer = null
  return function() {
    let self = this,
      args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function() {
      method.apply(self, args)
    }, delay)
  }
}
//新日期 
function renderTime(date, isdata) {
	if (!date) return ''
  var da = new Date(parseInt(date.replace('/Date(', '').replace(')/', '').split('+')[0]))
  var Year = da.getFullYear() //ie火狐下都可以
  var Month = da.getMonth() + 1
  var Day = da.getDate()
  var Hours = da.getHours()
  var Minutes = da.getMinutes()
  var Seconds = da.getSeconds()
  var CurrentDate = ''
  CurrentDate += Year + '/'
  if (Month >= 10) {
    CurrentDate += Month + '/'
  } else {
    CurrentDate += '0' + Month + '/'
  }
  if (Day >= 10) {
    CurrentDate += Day
  } else {
    CurrentDate += '0' + Day
  }
  if (Hours < 10) {
    Hours = '0' + Hours
  }
  if (Minutes < 10) {
    Minutes = '0' + Minutes
  }
  if (Seconds < 10) {
    Seconds = '0' + Seconds
  }
  if (isdata) {
    return CurrentDate
  } else {
    return CurrentDate + ' ' + Hours + ':' + Minutes + ':' + Seconds
  }
}
// 获取当前日期
function getCurrentTime() {
  var date = new Date()
  var year = date.getFullYear() //ie火狐下都可以
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
	
  if(month < 10) month = '0' + month
  if(day < 10) day = '0' + day
  if(hours < 10) hours = '0' + hours
  if(minutes < 10) minutes = '0' + minutes
  if(seconds < 10) seconds = '0' + seconds
	
  return year + '/' + month + '/' + day
}
//节流
function throttle(func, wait) {

  let timeout
  return function() {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }

  }
}
/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage ? currentPage.route : '' //当前页面url
  return url
}
/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
/*JS 地址截取 省市区 (含自治区，直辖市，县，自治县)*/
function getArea(str) {
  let arr = []
  let area = {}
  arr = str.match(/.+?(省|市|自治区|自治州|县|区)/g)
  if (arr[0] == arr[1]) { //安卓手机中，会出现“北京市北京市朝阳区”
    arr.splice(1, 1)
  }
  if (arr.length == 2) { //直辖市
    area.Province = arr[0]
    area.City = arr[1]
    area.District = ''
  } else {
    area.Province = arr[0]
    area.City = arr[1]
    area.District = arr[2]
  }
  return area
}

//计算详细时间 
function countime(time) {
  let pTime = parseInt(time)
  let day = parseInt(pTime / 86400000)
  let hour = zeroFill('' + parseInt(pTime % 86400000 / 3600000), 2)
  let minute = zeroFill('' + parseInt(pTime % 86400000 % 3600000 / 60000), 2)
  let second = zeroFill('' + parseInt(pTime % 86400000 % 3600000 % 60000 / 1000), 2)

  return ({
    day,
    hour,
    minute,
    second
  })
}

function zeroFill(str, n) {
  if (str.length < n) {
    str = '0' + str
  }
  return str
}

/*距离转换KM,M*/
function distanceConvert(num) {
  num = Number(num)
  let unitKm
  if (num > 1000) {
    unitKm = (Math.round(num / 100) / 10).toFixed(1) + 'km'
  } else if (num > 0 && num < 1000) {
    unitKm = num.toFixed(0) + 'm'
  } else if (num == 0) {
    unitKm = null
  }
  return unitKm
}
/*百度BD坐标转火星坐标gcj02*/

function bdToGc(lng, lat) {

  var X_PI = Math.PI * 3000.0 / 180.0
  var x = lng * 1 - 0.0065
  var y = lat * 1 - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
  var lng = z * Math.cos(theta)
  var lat = z * Math.sin(theta)
  return {
    lng,
    lat
  }
}


const uniAsync = new Proxy({}, {
  get(target, name) {
    return (obj) => new Promise((resolve, reject) => {
      uni[name]({
        ...obj,
        success: ret => {
          resolve(ret)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
})

function base64src(base64data, cb) {

  const fsm = wx.getFileSystemManager()
  const FILE_BASE_NAME = 'tmp_base64src' //自定义文件名
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
  if (!format) {
		uni.hideLoading()
		uni.showToast({
		  title: '格式化文件失败',
		  duration: 2000,
		  icon: 'none'
		})
    return (new Error('ERROR_BASE64SRC_PARSE'))
  }
  const time = new Date().getTime() //自定义文件名
  const filePath = `${wx.env.USER_DATA_PATH}/${time}.${format}`
  const buffer = wx.base64ToArrayBuffer(bodyData)
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath)
    },
    fail(res) {
			uni.hideLoading()
			uni.showToast({
			  title: `写入文件失败：${res.errMsg}`,
			  duration: 2000,
			  icon: 'none'
			})
      return (new Error('ERROR_BASE64SRC_WRITE'))
    },
  })
};

//首字母缩进
function retract(str) {
  let arr = str.split('')
  arr.forEach((value, index) => {
    if (value == ' ') {
      arr[index] = '&nbsp;'
    };
  })
  let sty = arr.join('')
  sty = sty.replace(/\&nbsp;&nbsp;&nbsp;&nbsp;/g, '&emsp;')
  sty = sty.replace(/\&nbsp;&nbsp;/g, '&ensp;')
  return sty
};

function serializeStr(str) {
  if (str) {
    return str.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ').replace(/&lt;/g, '<').replace(
      /&gt;/g, '>').replace(/&nbsp;/g, ' ')
  } else {
    return null
  }
};

//判断版本
function isNewVersion() {
  const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
  if (extConfig.templateId < 60) {
    return false
  } else {
    return true
  }

};
//URL参数转换对象
function parseQueryString(params) {
  let obj = {}
  let parr = params.split('&') // 将参数分割成数组 ["id = 1 ", " type = 2"]
  for (let i of parr) { // 遍历数组
    let arr = i.split('=') // 1） i id = 1   arr = [id, 1]  2）i type = 2  arr = [type, 2]
    obj[arr[0]] = arr[1] // obj[arr[0]] = id, obj.id = 1   obj[arr[0]] = type, obj.type = 2
  }
  return obj
}

function filter(str) { // 特殊字符转义
  str += '' // 隐式转换
  str = str.replace(/%/g, '%25')
  str = str.replace(/\+/g, '%2B')
  str = str.replace(/ /g, '%20')
  str = str.replace(/\//g, '%2F')
  str = str.replace(/\?/g, '%3F')
  str = str.replace(/&/g, '%26')
  str = str.replace(/\=/g, '%3D')
  str = str.replace(/#/g, '%23')
  return str
}
//对象转换URL参数
function formateObjToParamStr(paramObj) {
  const sdata = []
  for (let attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`)
  }
  return sdata.join('&')
};
//新日期 
function transitionTime(date, isdata) {
  var da = new Date(parseInt(date.replace('/Date(', '').replace(')/', '').split('+')[0]))
  var Year = da.getFullYear() //ie火狐下都可以
  var Month = da.getMonth() + 1
  var Day = da.getDate()
  var Hours = da.getHours()
  var Minutes = da.getMinutes()
  var Seconds = da.getSeconds()
  var CurrentDate = ''
  CurrentDate += Year + '/'
  if (Month >= 10) {
    Month = Month + '月'
  } else {
    Month = '0' + Month + '月'
  }
  if (Day >= 10) {
    Day = Day + '日'
  } else {
    Day = '0' + Day + '日'
  }
  if (Hours < 10) {
    Hours = '0' + Hours
  }
  if (Minutes < 10) {
    Minutes = '0' + Minutes
  }
  if (Seconds < 10) {
    Seconds = '0' + Seconds
  }
  if (isdata) {
    return CurrentDate
  } else {
    return Month + Day + Hours + ':' + Minutes
  }

};
//除法精度问题
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return Number(s1.replace('.', '')) / Number(s2.replace('.', '')) / Math.pow(10, m)
}

function getTimeOut(time) {
  let ceilTime =Number(time) / 60
  let unitTime
  if (ceilTime > 1 && ceilTime < 60) {
    unitTime = `${Math.round(ceilTime)}分钟`
  } else if (ceilTime >= 60) {
    if (ceilTime % 60 == 0) {
      unitTime = `${ceilTime / 60}小时`
    } else if (ceilTime % 60 > 0) {
      unitTime = `${Math.floor(ceilTime / 60)}小时${Math.floor(ceilTime % 60)}分钟`
    }
  } else if (ceilTime < 1) {
    unitTime = `${time}秒`
  } else {
    unitTime = null
  }
  return unitTime
}
//时间戳转时间
function formatsDate(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d'

  var zero = function (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  var myDate = timestamp? new Date(timestamp): new Date()

  var year = myDate.getFullYear()
  var month = zero(myDate.getMonth() + 1)
  var day = zero(myDate.getDate())

  var hour = zero(myDate.getHours())
  var minite = zero(myDate.getMinutes())
  var second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches]
  })
}

// 对象过滤空值
function filterNull(obj) {
    let tmp = Object.entries(obj);
    let res = {};
    tmp.filter(function(item){
        return item[1] !== "" && item[1] !== null && item[1] !== undefined;
    }).forEach(function(val){
        res[val[0]] = val[1];
    });
    return res;
}

// 元转分 - yuan:要转换的钱，单位元； digit：转换倍数
function priceToFen(yuan=0,digit=100) {
	let m=0,
		s1=yuan.toString(),
		s2=digit.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
export {
  debounce,
  throttle,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  getArea,
  distanceConvert,
  renderTime,
  getCurrentTime,
  countime,
  zeroFill,
  bdToGc,
  base64src,
  retract,
  serializeStr,
  isNewVersion,
  parseQueryString,
  formateObjToParamStr,
  transitionTime,
  uniAsync,
  accMul,
  getTimeOut,
  formatsDate,
  filterNull,
	priceToFen
}
