// 混入

export default {
    methods: {
        borrowToFather(money) {
            //通过this.$parent获取父亲(如果有二个父亲的话不适用这种!因为存在组件复用的情况!)
            //必须只有一个父亲才可以使用

            //自己的钱-50
            this.money -= money;

            //父亲钱+50
            this.$parent.money += money;
        }
    }
}



