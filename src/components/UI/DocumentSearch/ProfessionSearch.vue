<template>
  <div>
    <div class="table-line">
      <span class="select-title">学校学院</span>
      <linkage-select :linkageDatas="optionalSearchs" v-model="institute" @track="onSetInstitute"></linkage-select>
    </div>
    <div class="table-line">
      <span class="select-title">专业</span>
      <el-menu class="select-radio" :default-active="major" mode="horizontal" @select="setMajor">
        <el-menu-item class="select-radio-item"
                      v-for="(value, name) in majors" :key="name"
                      :index="name">{{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">学期</span>
      <el-menu class="select-radio" :default-active="semester" mode="horizontal" @select="setSemester">
        <el-menu-item class="select-radio-item"
                      v-for="(value, name) in semesters" :key="name"
                      :index="name">{{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">科目</span>
      <el-menu class="select-radio" :default-active="subject" mode="horizontal" @select="setSubject">
        <el-menu-item index="ALL" class="select-radio-item">全部</el-menu-item>
        <el-menu-item class="select-radio-item"
                      v-for="name of subjects" :key="name"
                      :index="name">{{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">排序</span>
      <el-menu class="select-radio" :default-active="order" mode="horizontal" @select="setOrder">
        <el-menu-item index="COLLECTED" class="select-radio-item">收藏量</el-menu-item>
        <el-menu-item index="PRINT" class="select-radio-item">打印量</el-menu-item>
        <el-menu-item index="TIME" class="select-radio-item">上传时间</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import linkageSelect from '$@/UI/LinkageSelect';
  import { getFirstKey } from '@/utils/tools';

  export default {
    name: 'profession-search',
    components: { linkageSelect },
    props: {
      defaultSearchs: {
        type: Object,
        required: false,
        default: () => ({})
      },
      optionalSearchs: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        institute: [],
        instituteID: null,
        majors: {},
        major: '',
        semesters: {},
        semester: '',
        subjects: [],
        subject: '',
        order: 'COLLECTED'
      };
    },
    computed: {},
    watch: {
      defaultSearchs: {
        handler () {
          this.setDefault();
        },
        deep: true
      }
    },
    created () {
      this.setDefault();
    },
    methods: {
      async setDefault () {
        if (_.isEmpty(this.defaultSearchs)) return;
        let { institute, major, semester, subject, order } = this.defaultSearchs;
        this.institute = institute;
        await this.$nextTick();
        this.major = major;
        await this.$nextTick();
        this.semester = semester;
        await this.$nextTick();
        this.subject = subject;
        this.order = order;
      },
      async onSetInstitute (institute) {
        this.instituteID = institute.id;
        this.majors = institute.majors;
        await this.$nextTick();
        let major = getFirstKey(this.majors, this.major);
        this.setMajor(major);
      },
      async setMajor (major) {
        this.major = major;
        this.semesters = this.majors[major];
        await this.$nextTick();
        let semester = getFirstKey(this.semesters, this.semester);
        this.setSemester(semester);
      },
      async setSemester (semester) {
        this.semester = semester;
        this.subjects = this.semesters[semester];
        await this.$nextTick();
        let subject = getFirstKey(this.subjects, this.subject);
        this.setSubject(subject);
      },
      setSubject (subject) {
        this.subject = subject;
        this.search();
      },
      setOrder (order) {
        this.order = order;
        this.search();
      },
      search () {
        let { instituteID: institute, major, semester, subject, order } = this;
        this.$emit('search', {
          institute,
          major,
          semester,
          subject,
          order
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./document-search"
</style>
