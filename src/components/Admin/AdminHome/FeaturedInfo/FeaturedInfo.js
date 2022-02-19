import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './FeaturedInfo.module.scss';
import { featuredData } from '../../../../assets/exampleData';
import firstLetterUpper from '../../../../utility/firstLetterUpper';
import InfoBox from '../../../UI/InfoBox/InfoBox';

const FeaturedInfo = () => {
    const data = featuredData;

    return (
        <div className={classes.FeaturedInfo}>
            {Object.keys(data).map(item => {
                let percentage = data[item].percentage;

                return <InfoBox key={item} title={firstLetterUpper(item)}>
                    <div className={classes.FeaturedInfo__Body}>
                        <span className={classes.FeaturedInfo__Body__Amount}>{`$${data[item].amount}`}</span>

                        <span className={classes.FeaturedInfo__Body__Percentage}>{`${percentage > 0 ? '+' : ''}${percentage}`}</span>

                        <svg className={percentage > 0 ?
                            [classes.FeaturedInfo__Body__Icon, classes.FeaturedInfo__Body__Icon__Increase].join(' ') :
                            [classes.FeaturedInfo__Body__Icon, classes.FeaturedInfo__Body__Icon__Decrease].join(' ')}>
                            <use xlinkHref={`${svg}#icon-arrow-${percentage > 0 ? 'up' : 'down'}`}></use>
                        </svg>
                    </div>

                    <footer className={classes.FeaturedInfo__Footer}>
                        Compared to last month
                    </footer>
                </InfoBox>;
            })}
        </div>
    )
}

export default FeaturedInfo;