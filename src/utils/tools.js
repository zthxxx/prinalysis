/*
把人名币分值格式化到元
 */
export const formatCNY = (cents) => new Intl.NumberFormat(
  'zh-CN',
  {
    style: 'currency',
    currency: 'CNY'
  }).format(cents / 100);
