;
(function () {
    //分页器构造函数
    function pagination(ele, option, cb) {
        this.ele = ele; //父容器
        this.option = option || {}; //用户设置
        this.list = null; //存储页码
        this.cb = cb || function () {}; //回调函数
        //默认设置参数
        this.default = {
            //数据信息
            pageInfo: {
                pagenum: 1, //当前页
                pagesize: 10, //一页显示的条数
                totalsize: 1000, //总条数
                totalpage: 100, //总页数
                least: 10, //当总页数低于这个数的时候设置全部显示
                size: 4 //一次显示多少页数据,4页就是1,2,3,4....倒数第二,倒数第一
            },
            //文本信息
            textInfo: {
                first: '首页', //第一页
                prev: '上一页', //上一页
                list: "", //存1,2,3...页数的列表
                next: '下一页', //下一页
                last: '尾页' //最后一页
            }
        }
        // 初始化
        this.init();
    }

    //初始化参数
    pagination.prototype.init = function () {

        //初始化用户参数
        this.setDefault();
        // console.log(this.default);//输出查询
        //初始化首页,上一页,下一页,尾页,跳转
        this.createDivButton();
        //显示页码
        this.showNum();
        //绑定单击事件绑定按钮,前一页,后一页之类的单击事件
        this.bindClick();
        //检查输入框的值是否合法
        this.checkIpt();
    }

    //初始化用户参数
    pagination.prototype.setDefault = function () {
        //清空父元素
        this.ele.innerHTML = "";
        for (let key in this.option.pageInfo) {
            key = key.toLowerCase();
            this.default.pageInfo[key] = this.option.pageInfo[key];
        }
        for (let key in this.option.textInfo) {
            key = key.toLowerCase();
            this.default.textInfo[key] = this.option.textInfo[key];
        }
    }

    //显示页码
    pagination.prototype.showNum = function () {
        //清空前面的页码
        this.list.innerHTML = "";
        var nowPage = parseInt(this.default.pageInfo.pagenum); //获取当前页码
        var totalpage = parseInt(this.default.pageInfo.totalpage); //获取总页数
        var least = parseInt(this.default.pageInfo.least); //当总页数低于这个数的时候设置全部显示
        var size = parseInt(this.default.pageInfo.size); //一次显示多少页数据,4页就是1,2,3,4....倒数第二,倒数第一
        //输入框数字更新!!!!!!!!!!!!!!!!
        this.ele.querySelector("input.self-input").value = nowPage;
        //按钮禁用更新
        this.closeButton();
        //启用回调,返回当前页码
        this.cb(nowPage);
        if (totalpage <= least) {
            //显示全部页码
            for (let i = 1; i <= totalpage; i++) {
                //创建元素
                var p1 = this.createEleP(i, nowPage);
                //添加到页码list
                this.list.appendChild(p1);
            }
        } else {
            //总页数大于了设置的最低页数(least)
            //判断当前页是否小于设置的最低显示页数(size)
            if (nowPage < size) {
                // console.log("我进来了nowPage < size");
                for (let i = 1; i <= size; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
                //添加..
                var em = document.createElement("em");
                em.innerText = "...";
                this.list.appendChild(em);
                //在额外添加导数二页
                for (let i = totalpage - 1; i <= totalpage; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
            }
            //当前的页(pagenum)大于了设置的最低显示页数(size)等之类的条件
            // 当前页码等于一次显示的页码,从1,显示到size+2页
            else if (nowPage == size) {
                // console.log("我进来了nowPage == size");
                for (let i = 1; i <= (size + 2); i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
                //添加..
                var em = document.createElement("em");
                em.innerText = "...";
                this.list.appendChild(em);
                //在额外添加导数二页
                for (let i = totalpage - 1; i <= totalpage; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
            }

            //
            else if (nowPage > size && nowPage < (totalpage - size)) {
                // console.log("我进来了nowPage > size-------------");
                // 显示前二页
                for (let i = 1; i <= 2; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
                //添加..
                var em = document.createElement("em");
                em.innerText = "...";
                this.list.appendChild(em);
                //显示中间的
                for (let i = nowPage; i <= (nowPage + size); i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
                //添加..
                var em = document.createElement("em");
                em.innerText = "...";
                this.list.appendChild(em);
                //显示末尾的
                for (let i = totalpage - 1; i <= totalpage; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
            }
            //剩余的页数小于size,就全部显示出来
            else {
                // console.log("我进来了 else-------------");
                // 显示前二页
                for (let i = 1; i <= 2; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
                //添加..
                var em = document.createElement("em");
                em.innerText = "...";
                this.list.appendChild(em);
                //显示剩余的
                for (let i = (totalpage - size); i <= totalpage; i++) {
                    //创建元素
                    var p1 = this.createEleP(i, nowPage);
                    //添加到页码list
                    this.list.appendChild(p1);
                }
            }
        }

    }

    //绑定按钮,前一页,后一页之类的单击事件
    pagination.prototype.bindClick = function () {
        this.ele.onclick = (e) => {
            //兼容处理
            e = e || window.event;
            var tarEle = e.target || e.srcElement;
            var pagenum = parseInt(this.default.pageInfo.pagenum);
            var totalpage = parseInt(this.default.pageInfo.totalpage);
            //首页 (判断class名字)
            if ("self-first" == tarEle.className && pagenum != 1) {
                //修改当前页数据
                this.default.pageInfo.pagenum = 1;
                this.showNum();
                return;
            }
            //上一页
            if ("self-prev" == tarEle.className && pagenum != 1) {
                this.default.pageInfo.pagenum = --pagenum;
                //重新绘制
                this.showNum();
                return;
            }
            //下一页
            if ("self-next" == tarEle.className && pagenum != totalpage) {
                this.default.pageInfo.pagenum = ++pagenum;
                //重新绘制
                this.showNum();
                return;
            }
            //尾页
            if ("self-last" == tarEle.className && pagenum != totalpage) {
                this.default.pageInfo.pagenum = totalpage;
                //重新绘制
                this.showNum();
                return;
            }
            //用户单击了页码
            if ("P" == tarEle.nodeName && pagenum != tarEle.innerText) {
                //重新设置页码
                this.default.pageInfo.pagenum = tarEle.innerText;
                //重新绘制
                this.showNum();
                return;
            }
            //用户单击了"确定"跳转到某一页
            if ("BUTTON" == tarEle.nodeName && pagenum != tarEle.previousElementSibling.value) {
                //获取输入框的数字
                var value = tarEle.previousElementSibling.value;
                this.default.pageInfo.pagenum = parseInt(value);
                this.showNum();
                return;
            }
        }
    }

    //设置按钮禁用操作
    pagination.prototype.closeButton = function () {
        //获取当前页码,不涉及数字算术操作,所以不使用parseInt
        var pagenum = this.default.pageInfo.pagenum;
        //获取div按钮,也就是首页,上一页,下一页,尾页
        var divs = this.ele.querySelectorAll("div");
        //如果在第一页
        if (pagenum == 1) {
            //添加不可活动类
            divs[0].classList.add("noactive"); //首页按钮
            divs[1].classList.add("noactive"); //上一页按钮
            return;
        } else {
            //移除不可活动类
            divs[0].classList.remove("noactive"); //首页按钮
            divs[1].classList.remove("noactive"); //上一页按钮
        }
        //如果在最后一页
        if (pagenum == this.default.pageInfo.totalpage) {
            //添加不可活动类
            divs[3].classList.add("noactive") //下一页按钮
            divs[4].classList.add("noactive") //尾页按钮
            return;
        } else {
            //移除不可活动类
            divs[3].classList.remove("noactive") //下一页按钮
            divs[4].classList.remove("noactive") //尾页按钮
        }
    }


    //检查输入框的值是否合法
    pagination.prototype.checkIpt = function () {
        //获取输入框
        var ipt = this.ele.querySelector("input.self-input");
        //失去焦点事件
        ipt.onblur = () => {
            //获取输入框的值
            var value = parseInt(ipt.value); //记得转化为整形
            //获取当前页
            var pagenum = this.default.pageInfo.pagenum;
            //获取总页
            var totalpage = this.default.pageInfo.totalpage;
            //如果输入的值大于了最大的页数和小于了1
            if (value > totalpage || value < 1) {
                //不变动
                ipt.value = pagenum;
                return;
            }
            //值为合法的值并且输入的值不等于当前的页码
            if (value && value != pagenum) {
                //更新当前页
                this.default.pageInfo.pagenum = value;
                //重新绘制
                this.showNum();
            }
        }
        //回车事件
        ipt.onkeydown = (e) => {
            e = e || window.event;
            //回车键被按下
            if (e.keyCode == 13 && parseInt(ipt.value) && this.default.pageInfo.pagenum != parseInt(ipt.value)) {
                ipt.onblur();
            }
        }
    }

    //创建p元素 text里面的文字,nowPage代表当前页码是多少
    pagination.prototype.createEleP = function (text, nowPage) {
        var pTemp = document.createElement("p");
        pTemp.innerHTML = text;
        //当前页的css样式
        if (text == nowPage) {
            pTemp.className = "active";
        }
        //返回创建好的元素对象
        return pTemp;
    }

    //创建div元素,也就是哪些按钮之类的,
    pagination.prototype.createDivButton = function () {
        //创建上一页,首页,下一页,尾页
        for (let name in this.default.textInfo) {
            var divTemp = document.createElement("div");
            if (name != 'list') {
                //设置class
                divTemp.className = "self-" + name;
                divTemp.innerHTML = this.default.textInfo[name];
                //设置样式
                this.ele.appendChild(divTemp);
            } else {
                //列表容器
                //设置列表的class名
                divTemp.className = "self-list";
                this.list = divTemp;
                this.ele.appendChild(divTemp);
            }
        }

        //创建输入框
        var iptEle = document.createElement("input");
        //设置输入框类名
        iptEle.className = "self-input";
        //设置显示页数
        iptEle.value = this.default.pageInfo.pagenum;
        //创建跳转按钮
        var btnEle = document.createElement("button");
        //设定类名
        btnEle.className = "self-button";
        //设置按钮内容
        btnEle.innerText = "确定";
        //添加到容器
        this.ele.appendChild(iptEle);
        this.ele.appendChild(btnEle);
    }

    //工厂函数,由这个工厂代为传递
    /**
     * 
     * @param {DOM} ele 容器div
     * @param {Object} option 设置选项
     * @param {funtion} cb 回调函数返回当前页码
     */
    function factor(ele, option, cb) {
        return new pagination(ele, option, cb);
    }

    window.paginationself = factor;
})();