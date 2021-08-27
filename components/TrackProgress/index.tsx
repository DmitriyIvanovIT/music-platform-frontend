import React, {ChangeEvent} from 'react';
import styles from './TrackProgress.module.scss';
import clsx from "clsx";
import getTime from '@/lib/getTime';

type TrackProgressProps = {
  left: number;
  right: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: 'timeline' | 'volume';
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange, type}) => {
  return (
    <div className={clsx(styles.progress__block, type === 'timeline' && styles.progress__block_timeline)}>
      <input
        type='range'
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div className={clsx(styles.progress__counts, type === 'timeline' && styles.progress__counts_timeline)}>
        {type === 'timeline'
          ? (getTime(left) + ' / ' + getTime(right))
          : (left + ' / ' + right)
        }
      </div>
    </div>
  );
};

export default TrackProgress;