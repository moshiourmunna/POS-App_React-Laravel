import React, {useState, useEffect} from "react";
import '../../style/businessSummary.scss';
import CoinIcon from "../../assets/icons/coinIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";


const businessSummary = (props) => {
    props.data[0].revenue = 10230.56;
    return (
        <div className='summary'>
            <div className='flex-row'>
                <div className='iconBackground'>
                    <CoinIcon
                        width={26}
                        height={26}
                        color={'#9288E0'}
                    />
                </div>

                {
                    (props.data[0].stock >= 0) ?
                        <>
                            <p className='positive'>
                                +{props.data[0].stock}%
                            </p>
                            <div className='iconBackgroundSmall'>
                                <ArrowUpIcon
                                    width={16}
                                    height={30}
                                    color={'#50D1AA'}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='negative'>
                                -{props.data[0].stock}%
                            </p>
                            <div className='iconBackgroundSmall'>
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
                (props.data[0].revenue)?
                    <h2>$10,220.22</h2>
                    :
                    <h2>10,220.22</h2>
            }
            <p>{props.title}</p>
        </div>
    )
}

export default businessSummary