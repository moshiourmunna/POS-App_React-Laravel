import React, {useState, useEffect} from "react";
import '../../style/businessSummary.scss';
import CoinIcon from "../../assets/icons/coinIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";
import OrderIcon from "../../assets/icons/orderIcon";
import UserIcon from "../../assets/icons/userIcon";


const BusinessSummary = (props) => {
    return (
        <div className='summary'>
            <div className='flex-row'>
                <div className='iconBackground'>
                    {
                        (props.money)?
                            <CoinIcon
                                width={26}
                                height={26}
                                color={'#9288E0'}
                            />
                            :(props.order)?
                            <OrderIcon
                                color={'#FFB572'}
                                width={26}
                                height={26}
                            />
                            :
                            <UserIcon
                                color={'#65B0F6'}
                                width={26}
                                height={26}
                            />
                    }

                </div>

                {
                    (props.data >= 0) ?
                        (!props.loading) ?
                            <>
                                <p className='positive'>
                                    +{props.data}%
                                </p>
                                <div className='iconBackgroundSmallPositive'>
                                    <ArrowUpIcon
                                        width={16}
                                        height={30}
                                        color={'#50D1AA'}
                                    />
                                </div>
                            </>
                            :
                            <p className='positive'>
                                <BeatLoader size={10} color={'#a2a2a2'}/>
                            </p>
                        :
                        <>
                            <p className='negative'>
                                -{props.data}%
                            </p>
                            <div className='iconBackgroundSmallNegative'>
                                <ArrowDownIcon
                                    width={25}
                                    height={21}
                                    color={'#EA7C69FF'}
                                />
                            </div>
                        </>
                }
            </div>
            {
                (props.loading)?
                    <h2 className='summeryData'>
                        <BeatLoader size={10} color={'#a2a2a2'}/>
                    </h2>
                    :
                (props.money) ?
                    <h2 className='summeryData'>${props.data}</h2>
                    :
                    <h2 className='summeryData'>{props.data}</h2>
            }
            <p>{props.title}</p>
        </div>
    )
}

export default BusinessSummary

BusinessSummary.propTypes = {
    data: PropTypes.number,
    title: PropTypes.string.isRequired,
    money: PropTypes.bool,
    order: PropTypes.bool,
    loading: PropTypes.bool,
}
