import React, { useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import { Text } from '@/components/Text';
import { GENRE_NAME_MAP, GENRE_IMAGES_MAP, RU_TO_EN_GENRE_MAP } from '@/utils/genres';

import s from './Categories.module.scss';
import { getBreakpoints } from './config';

type Props = {
  selectedCategory?: string;
  onSelectCategory?: (category: string | undefined) => void;
};

export const Categories: React.FC<Props> = ({ selectedCategory, onSelectCategory }) => {
  const genreList = useMemo(() => Object.values(GENRE_NAME_MAP), []);

  const initialSlide = useMemo(() => {
    return selectedCategory ? genreList.indexOf(selectedCategory) : 0;
  }, [selectedCategory, genreList]);

  return (
    <div className={s.categories}>
      <Text view="title" color="primary" className={s.title}>
        Категории
      </Text>

      <div className={s.categories__inner}>
        <div className={s.navPrev}>
          <ArrowDownIcon />
        </div>
        <div className={s.navNext}>
          <ArrowDownIcon />
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.${s.navNext}`,
            prevEl: `.${s.navPrev}`,
          }}
          loop={true}
          slidesPerView={5}
          spaceBetween={12}
          initialSlide={initialSlide}
          breakpoints={getBreakpoints}
        >
          {genreList.map((cat) => (
            <SwiperSlide
              key={cat}
              className={`${s.category} ${cat === selectedCategory ? s.active : ''}`}
              onClick={() => {
                if (selectedCategory === cat) {
                  return onSelectCategory?.(undefined);
                }

                return onSelectCategory?.(cat);
              }}
            >
              <img
                src={GENRE_IMAGES_MAP[RU_TO_EN_GENRE_MAP[cat]]}
                alt={GENRE_NAME_MAP[RU_TO_EN_GENRE_MAP[cat]]}
                className={s.categoryImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
