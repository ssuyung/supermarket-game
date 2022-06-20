const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private curr_index_of_customers : number = 0;
    private curr_index_of_customers_to_counter : number = 0;
    private curr_index_of_customers_solved : number = 0;
    private counter_1_occupied : boolean = false;
    private counter_2_occupied : boolean = false;

    // onLoad () {}

    start () {

    }

    update (dt) {

    }

    getCustomerIndex() {
        let ret = this.curr_index_of_customers;
        this.curr_index_of_customers++;
        return ret;
    }

    checkAvailablebyIndex(idx) {
        if (this.counter_1_occupied && this.counter_2_occupied) return 0;
        if (this.curr_index_of_customers_to_counter == idx) {
            this.curr_index_of_customers_to_counter++;
            if (!this.counter_1_occupied) {
                this.counter_1_occupied = true;
                return 1;
            }
            else if (!this.counter_2_occupied) {
                this.counter_2_occupied = true;
                return 2;
            }
        }
        return 0;
    }
}
