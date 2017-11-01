export default {
  '/library/profession': {
    result: 'OK',
    info: {
      defaults: {
        institute: ['A城大学', 'xxx 学院'],
        major: '土木工程',
        semester: '大一上',
        subject: '材料力学(A)',
        order: 'COLLECTED'
      },
      optional: [
        {
          'A城大学': [
            {
              'xxx 学院': {
                '建筑学': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
                '土木工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
              }
            },
            {
              'XxXxx 学院': {
                '环境工程': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
                '车辆工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
              }
            }
          ]
        }
      ]
    }
  },
  '/library/thematic': {
    result: 'OK',
    info: {
      defaults: {
        category: '金融类',
        topic: '区块链',
        order: 'COLLECTED'
      },
      optional: {
        '语言类': ['托福', '雅思', 'GRE'],
        '金融类': ['风控', '区块链']
      }
    }
  }
};
