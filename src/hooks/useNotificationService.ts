import { useEffect, useRef, useCallback } from 'react';
import { ghostFriends, activityTypes } from '@/data/ghostFriends';

interface NotificationSettings {
  enabled: boolean;
  quietHours: boolean;
  sounds: boolean;
}

const isQuietHours = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 23 || hour < 7;
};

const getRandomActivity = () => {
  const friend = ghostFriends[Math.floor(Math.random() * ghostFriends.length)];
  const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  return { friend, activity };
};

const getRandomInterval = () => {
  // Random interval between 30 seconds and 3 minutes
  return Math.floor(Math.random() * (180000 - 30000) + 30000);
};

export const useNotificationService = (settings: NotificationSettings) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const permissionRef = useRef<NotificationPermission>('default');

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      permissionRef.current = 'granted';
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      permissionRef.current = permission;
      return permission === 'granted';
    }

    return false;
  }, []);

  const sendNotification = useCallback(() => {
    if (!settings.enabled) return;
    if (settings.quietHours && isQuietHours()) return;
    if (permissionRef.current !== 'granted') return;

    const { friend, activity } = getRandomActivity();
    
    const notification = new Notification(`${friend.name} (${friend.nameKr})`, {
      body: `${activity.icon} ${friend.name} ${activity.action}`,
      icon: friend.avatar,
      tag: 'airfriend-notification',
      silent: !settings.sounds,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }, [settings]);

  const scheduleNextNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!settings.enabled) return;

    const interval = getRandomInterval();
    timeoutRef.current = setTimeout(() => {
      sendNotification();
      scheduleNextNotification();
    }, interval);
  }, [settings.enabled, sendNotification]);

  useEffect(() => {
    if (settings.enabled) {
      requestPermission().then((granted) => {
        if (granted) {
          scheduleNextNotification();
        }
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [settings.enabled, requestPermission, scheduleNextNotification]);

  return { requestPermission, sendNotification };
};
