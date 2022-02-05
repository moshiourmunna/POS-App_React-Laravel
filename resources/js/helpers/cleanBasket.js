import React, {useEffect, useCallback} from "react";
import {useStateValue} from "../states/StateProvider";

let Cart=[];
const CleanBasket = () => {

    const [{basket}] = useStateValue();

         function getCleanBasket () {
            const unique = [];
            basket.map(x => unique.filter(a => a.productId === x.productId).length > 0 ? null : unique.push(x));
            Cart=unique;
        }

    useEffect(() => {
        getCleanBasket()
    }, [Cart]);

    return (
        <div>

        </div>
    )
}

export {CleanBasket, Cart}