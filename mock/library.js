import { randomMD5, randomAvatar, extract } from './tools'

const File = {
  'id|1': [randomMD5, '@id'],
  name: '@csentence().docx',
  created: '@now(T)',
  pages: '@natural(1, 10)',
  'format|1': ['docx', 'pptx', 'xlsx', 'pdf'],
  collected: '@natural(0, 5)',
  printed: '@natural(0, 15)',
  uid: '@id',
  'nickname|1': ['@name', '@cname']
}

const Folder = {
  id: '@id',
  name: '@cname()老师的精选',
  updated: '@now(T)',
  count: '@natural(1, 10)',
  collected: '@natural(0, 5)',
  view: '@natural(0, 15)',
  uid: '@id',
  'nickname|1': ['@name', '@cname']
}

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
                id: 1,
                majors: {
                  '建筑学': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
                  '土木工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
                }
              }
            },
            {
              'XxXxx 学院': {
                id: 2,
                majors: {
                  '环境工程': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
                  '车辆工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
                }
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
  },
  '/library/search/files': {
    'result': 'OK',
    'info|0-10': [{ ...File }]
  },
  '/library/search/floders': {
    'result': 'OK',
    'info|0-10': [{ ...Folder }]
  },
  '/library/contain/floders': {
    'result': 'OK',
    'info|0-4': [{ ...Folder }]
  },
  '/library/comment/file': {
    result: 'OK',
    'info|0-4': [{
      uid: '@id',
      avatar: randomAvatar,
      nickname: '@cname()',
      commentID: '@id',
      content: '@csentence()',
      created: '@now(T)'
    }]
  },
  '/library/folder/detail': {
    result: 'OK',
    info: {
      'name|1': ['@csentence()', '射惠主义的白色相簿'],
      'description|1': ['', '@csentence()', 'ass ♂ we ♂ can'],
      tags: extract(['射惠射惠', '白色的季节', 'boy ♂ next ♂ door', 'my ♂ follow ♂ brother'], 0, 3),
      created: '@now(T)',
      viewed: '@natural(0, 15)',
      collected: '@natural(0, 5)',
      uploader: {
        uid: '@id',
        avatar: randomAvatar,
        nickname: '@cname()',
      },
      'files|0-10': [{ ...File }]
    }
  },
  '/library/create/folder': {
  },
  '/library/collect/files': {
  },
  '/library/collect/folder': {
  },
  '/library/personal/folders': {
  },
  '/library/personal/files': {
  },
}
