import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { Text } from '@/components/Text';
import { useUserStore } from '@/store';

import { containerVariants, itemVariants } from './config';
import s from './Profile.module.scss';

const Profile = observer(() => {
  const { user, logout } = useUserStore();

  return (
    <motion.div
      className={s.profile}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={s.profile__content} variants={containerVariants}>
        <div className={s.profile__header}>
          <motion.div variants={itemVariants}>
            <Text view="title" color="primary">
              Профиль
            </Text>
          </motion.div>
          <motion.div className={s.avatarSection} variants={itemVariants}>
            <div className={s.avatarWrapper}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="avatar" className={s.avatar} />
              ) : (
                <PersonIcon width={80} height={80} />
              )}
            </div>
          </motion.div>
        </div>

        <motion.div className={s.profile__body} variants={itemVariants}>
          <div className={s.userInfo}>
            <Text view="title" weight="bold" color="primary">
              {user?.displayName || user?.email}
            </Text>
            <Text view="p-16" color="secondary">
              {user?.email}
            </Text>
          </div>
        </motion.div>

        <motion.div className={s.actions} variants={itemVariants}>
          <Button onClick={logout} variant="outlined">
            <Text view="p-18">Выйти</Text>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default Profile;
