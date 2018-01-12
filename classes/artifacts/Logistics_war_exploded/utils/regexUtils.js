/**
 * 校验对象，保存校验格式和出错信息
 */
var regexEnum = {
	// 整数
	intege : {
		text : /^-?[1-9]\d*$/,
		label : '请输入整数'
	},// 正整数
	intege1 : {
		text : /^[1-9]\d*$/,
		label : '请输入正整数'
	},
	// 正整数
	intege3 : {
		text : /^[0-9]\d*$/,
		label : '请输入正整数'
	},
	// 负整数
	intege2 : {
		text : /^-[1-9]\d*$/,
		label : '请输入负整数'
	},
	// 数字
	num : {
		text : /^([+-]?)\d*\.?\d+$/,
		label : '请输入数字'
	},
	// 数字
	num1 : {
		text : /^([+]?)\d*\.?\d+$/,
		label : '请输入正数'
	},
	// 小数
	decmal : {
		text : /^([+-]?)\d*\\.\d+$/,
		label : '请输入小数'
	},
	// 正小数
	decmal1 : {
		text : /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
		label : '请输入正小数'
	},
	// 正小数
	decmal3 : {
		text : /^[1-9]\d*.\d*|0.\d*[0-9]\d*$/,
		label : '请输入正小数'
	},
	// 负小数
	decmal2 : {
		text : /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/,
		label : '请输入负小数'
	},
	// 邮箱
	email : {
		text : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
		label : '邮箱格式必须为: ui@fjcts.com'
	},
	// 手机号
	mobilePhone : {
		text : /^(13|15|18)[0-9]{9}$/,
		label : '您输入的手机号码格式不正确'
	},
	// 电话号码（支持分机号）
	phone : {
		text : /^((([0\+]\d{2,3})|(0\d{2,3}))(-)?)?(\d{7,8})((-)?(\d{3,5}))?$/,
		label : '您输入的电话号码格式不正确'
	},
	// 电话号码（不支持分机号）
	phone1 : {
		text : /(^((0[1-9]\d{1,2})(-)?)?(\d{7,8})$)|(^\(0[1-9]\d{1,2}\)\d{7,8}$)/,
		label : '您输入的电话号码格式不正确'
	},
	// 传真号码
	fax : {
		text : /^((([0\+]\d{2,3})|(0\d{2,3}))(-)?)?(\d{7,8})((-)?(\d{3,5}))?$/,
		label : '您输入的传真号码格式不正确'
	},
	// 联系方式
	contact : {
		text : /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
		label : '您输入的联系方式格式不正确'
	},
	// 联系方式
	contact1 : {
		text : /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})(-)?(\d{7,8})|(\d{4}|\d{3})(-)?(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(-)?(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
		label : '您输入的联系方式格式不正确'
	},
	// 订单号
	orderNo : {
		text : /^[A-Za-z]{4}[0-9]{16}$/,
		label : '您输入的订单号不正确！订单号长度为20位'
	},
	// 投诉建议号
	compNo : {
		text : /^[A-Za-z]{2}[0-9]{16}$/,
		label : '您输入的投诉建议号不正确！投诉建议号长度为18位'
	},
	// 客户编号
	customerId : {
		text : /^[A-Za-z0-9]{32}$/,
		label : '客户编号为32位数字或字母'
	},
	// 会员卡号
	memberCardNo : {
		text : /^\d{16}$/,
		label : "卡号必须是16位数字"
	},
	// 密码信封
	enevlopeSeq : {
		text : /^\d{16}$/,
		label : '密码信封格式必须是16位数字'
	},
	// 会员卡密码
	cardPassword : {
		text : /^\d{6}$/,
		label : '密码必须是6位数字'
	},
	//消费卡面值
	cardPayValue : {
		text : /^(100|200|500|1000)$/,
		label : '消费卡面值额必须是：100,200,500,1000之一'
	},
	//卡序号(8位)
	cardSeq : {
		text : /^\d{8}$/,
		label : '卡序号必须是8位，如：00000100'
	},
	// 会员卡类型
	cardType : {
		text : /^c300|c301|c032$/,
		label : '请先确定卡类型'
	},
	// 会员等级
	cardGrade : {
		text : /^e810|e800|e801|e802|e803$/,
		label : '请先确定会员等级'
	},
	// 用户名
	username : {
		text : /^\w+$/,
		label : '用户名必须是由数字、26个英文字母或者下划线组成的字符串'
	},
	// 金额
	cash : {
		text : /^\d{1,14}(\.\d{1,2})?$/,
		label : '您输入的收款金额格式不正确！格式为：88或88.00'
	},
	// 小时数
	hours : {
		text : /^\d{1,4}(\.\d{1,2})?$/,
		label : '时间格式不正确!'
	},
	// 交易号码
	busNo : {
		text : /^[A-Za-z0-9]{3,30}$/,
		label : '交易号码为3至30位数字或字母'
	},
	// 身份证
	idcard : /^[1-9]([0-9]{14}|[0-9]{17})$/,

	// IP地址
	ip : {
		text : /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
		label : '您输入的IP地址不正确'
	},
	// 拼音名
	spellName : {
		text : /^[A-Za-z]([\s]?[A-Za-z])+$/,
		label : '您输入的拼音名不正确！拼音名只能包含字母和空格，且不能以空格开头或空格结尾'
	},
	// 中国邮编6位数字
	zipCode : {
		text : /^[1-9]\d{5}(?!\d)$/,
		label : '您输入的邮编格式不正确！邮编只能由6位的数字组成'
	},
	//日期格式
	date : {
		text : /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
		label : '您输入的日期格式有误'
	},
	//班次号
	queueNo:{
		text : /^[A-Za-z0-9]{1,20}$/,
		label: '班次号为1-20位字母或数字'
	},
	//发车规则（按月内日期发）
	monthRuleValue:{
		text : /^(((0)?[1-9]{1}(,|，))|([1-2]{1}[0-9]{1}(,|，))|(3[0-1]{1}(,|，)))*(((0)?[1-9]{1})|([1-2]{1}[0-9]{1})|(3[0-1]{1}))$/,
		label: '月格式为：01到31，逗号隔开'
	},
	//发车规则（按周几发）
	weekRuleValue:{
		text : /^([1-7]{1}(,|，)){0,6}[1-7]{1}$/,
		label: '周格式为：1到7，逗号隔开，最多7个'
	},
	// 客房编码
	roomId : {
		text : /^[A-Za-z0-9]{1,32}$/,
		label : '客房编码为1-32位字母或数字'
	},
	// sycode代码下拉选择值
	code : {
		text : /^[A-Za-z0-9]{4}$/,
		label : '格式不正确'
	},
	// 日期格式：'20091231'
	dateStr : {
		text : /^\d{8}$/,
		label : '日期格式不正确'
	},
	// HH:mm时间格式
	time : {
		text : /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
		label:'您输入的时间格式不正确！正确范例: 23:59'
	},
	//中文
	chinese:{
		text:/^[^u4E00-u9FA5]{1,16}$/,
		label:'请输入小于16位的中文汉字'
	},
	english:{
		text:/^[A-Za-z_]{1,32}$/,
		label:'请输入小于32位的字母或下划线'
	},
	codeType:{
		text:/^[A-Za-z0-9]{2}$/,
		label:'代码类型请输入2位的数字或字母'
	},
	keyWord:{
		text:/^[0-9A-Za-z]{0,64}$/,
		label:'关键字请输入小于64位的数字或字母'
	},
	forShort:{
		text:/^[a-zA-Z0-9]{0,64}$/,
		label:'简称请输入小于64位的字母或数字'
	},
	organ:{
		text:/^[a-zA-Z0-9]{32}$/,
		label:'请选择正确的机构'
	},
	orderNo:{
		text:/^[0-9]{0,4}$/,
		label:'顺序请输入小于999的数字'
	},
	jobName:{
		text:/^[_a-zA-Z]{1}[a-zA-Z0-9]{1,62}$/,
		label:'请输入以下划线或字母开头的小于64位字母或数字'
	},
	className:{
		text:/^(([a-zA-Z]+)\.)+([a-zA-Z]+)$/,
		label:'类名必须由字母和·组成'
	},
	repeatCount:{
		text:/^[0-9]{1,16}$/,
		label:'请输入数字'
	}
}