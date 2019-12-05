const shop = {
    state: {
        goodsDetail: {},
        goodsStatus: false,
        shopCart: [],
        cartStatus: false,
        orderList: []
    },
    mutations: {
        setGoodsDetail(state, val) {
            state.goodsDetail = val
        },
        changeGoodsStatus(state) {
            state.goodsStatus = !state.goodsStatus
        },
        changeCartStatus(state) {
            state.cartStatus = !state.cartStatus
        },
        setCartNum(state, val) {
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].id === val.id) {
                    return
                } else {
                    continue
                }
            }
            val.num = 0;
            val.chooseStatus = false;
            shopCart.push(val);
        },
        reduceCartNum(state, id) {
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].id === id) {
                    shopCart[i].num--;
                    return;
                }
                else {
                    continue
                }
            }
        },
        addCartNum(state, id) {
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].id === id) {
                    shopCart[i].num++;
                    return;
                }
                else {
                    continue;
                }
            }
        },
        removeCartNum(state, id) {
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].id === id) {
                    shopCart[i].num = 0
                    return
                } else {
                    continue
                }
            }
        },
        changeChooseStatus(state, item) {
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].id === item.id) {
                    shopCart[i].chooseStatus = item.chooseStatus;
                    return;
                } else {
                    continue;
                }
            }
        },
        addNewOrder(state, item) {
            state.orderList.push(item);
            let shopCart = state.shopCart;
            for (let i = 0; i < shopCart.length; i++) {
                if (shopCart[i].chooseStatus) {
                    shopCart.splice(i, 1);
                    i--;
                }
            }
        }
    },
    actions: {
        set_goodsDetail({ commit }, val) {
            commit('setGoodsDetail', val)
        },
        change_goodsStatus({ commit }) {
            commit('changeGoodsStatus')
        }
    },
    getters: {
        getCartNum: (state) => (id) => {
            return state.shopCart.find(item => item.id === id)
        },
        getShopCart(state) {
            return state.shopCart
        }
    }
}
export default shop