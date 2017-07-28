import React, {PropTypes} from 'react';
import CommentCount from './CommentCount';
import styles from './styles.css';
import {SelectField, Option} from 'react-mdl-selectfield';
import {Icon} from 'coral-ui';
import {Link} from 'react-router';
import {getModPath} from '../../../utils';

import t from 'coral-framework/services/i18n';

const ModerationMenu = ({
  asset = {}, 
  allCount,
  acceptedCount,
  premodCount,
  newCount,
  rejectedCount,
  reportedCount,
  selectSort,
  sort,
  premodEnabled
}) => {
  return (
    <div className="mdl-tabs">
      <div className={`mdl-tabs__tab-bar ${styles.tabBar}`}>
        <div className={styles.tabBarPadding} />
        <div>

          {
            premodEnabled ? (
              <Link
                to={getModPath('premod', asset.id)}
                className={`mdl-tabs__tab ${styles.tab}`}
                activeClassName={styles.active}>
                <Icon name='access_time' className={styles.tabIcon} /> {t('modqueue.premod')} <CommentCount count={premodCount} />
              </Link>
            ) : (
              <Link
                to={getModPath('new', asset.id)}
                className={`mdl-tabs__tab ${styles.tab}`}
                activeClassName={styles.active}>
                <Icon name='question_answer' className={styles.tabIcon} /> {t('modqueue.new')} <CommentCount count={newCount} />
              </Link>
            )
          }

          <Link
            to={getModPath('reported', asset.id)}
            className={`mdl-tabs__tab ${styles.tab}`}
            activeClassName={styles.active}>
            <Icon name='flag' className={styles.tabIcon} /> {t('modqueue.reported')} <CommentCount count={reportedCount} />
          </Link>
          <Link
            to={getModPath('approved', asset.id)}
            className={`mdl-tabs__tab ${styles.tab}`}
            activeClassName={styles.active}>
            <Icon name='check' className={styles.tabIcon} /> {t('modqueue.approved')} <CommentCount count={acceptedCount} />
          </Link>
          <Link
            to={getModPath('rejected', asset.id)}
            className={`mdl-tabs__tab ${styles.tab}`}
            activeClassName={styles.active}>
            <Icon name='close' className={styles.tabIcon} /> {t('modqueue.rejected')} <CommentCount count={rejectedCount} />
          </Link>
          <Link
            to={getModPath('all', asset.id)}
            className={`mdl-tabs__tab ${styles.tab}`}
            activeClassName={styles.active}>
            <Icon name='question_answer' className={styles.tabIcon} /> {t('modqueue.all')} <CommentCount count={allCount} />
          </Link>
        </div>
        <SelectField
          className={styles.selectField}
          label="Sort"
          value={sort}
          onChange={(sort) => selectSort(sort)}>
          <Option value={'REVERSE_CHRONOLOGICAL'}>{t('modqueue.newest_first')}</Option>
          <Option value={'CHRONOLOGICAL'}>{t('modqueue.oldest_first')}</Option>
        </SelectField>
      </div>
    </div>
  );
};

ModerationMenu.propTypes = {
  allCount: PropTypes.number.isRequired,
  premodCount: PropTypes.number.isRequired,
  rejectedCount: PropTypes.number.isRequired,
  reportedCount: PropTypes.number.isRequired,
  asset: PropTypes.shape({
    id: PropTypes.string
  })
};

export default ModerationMenu;
