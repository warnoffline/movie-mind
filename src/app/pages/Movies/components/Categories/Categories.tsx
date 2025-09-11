import React, { useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import Text from '@/components/Text';
import { genres, genreImages } from '@/utils/genres';

import s from './Categories.module.scss';

type Props = {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
};

export const Categories: React.FC<Props> = ({ selectedCategory, onSelectCategory }) => {
  const initialSlide = useMemo(() => {
    return selectedCategory ? genres.indexOf(selectedCategory) : 0;
  }, [selectedCategory]);

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
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {genres.map((cat) => (
            <SwiperSlide
              key={cat}
              className={`${s.category} ${cat === selectedCategory ? s.active : ''}`}
              onClick={() => {
                if (selectedCategory === cat) {
                  return onSelectCategory?.('');
                }

                return onSelectCategory?.(cat);
              }}
            >
              <img src={genreImages[cat]} alt={cat} className={s.categoryImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
