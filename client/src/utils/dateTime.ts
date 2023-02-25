export const timeSince = (date: any, label: string = "پیش") => {
    if (!date) return "بدون تاریخ";
  
    const dateObject = new Date(date);
    const seconds = Math.floor((+new Date() - +dateObject) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return `${Math.floor(interval)} سال ${label}`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} ماه ${label}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} روز ${label}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} ساعت ${label}`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} دقیقه ${label}`;
    }
    if (Math.floor(seconds) > 0) {
      return `${Math.floor(seconds)} ثانیه ${label}`;
    }
  
    return "همین لحظه";
  };