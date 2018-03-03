<template>
  <div class="library">
    <header>
      <div class="back" @click="back">
        <i class="el-icon-fa-angle-left"></i><span>返回</span>
      </div>
      <div class="title">
        <figure class="person">
          <img :src="person.avatar" alt="person"/>
          <figcaption class="description">
            <div class="nickname">{{person.nickname}}的收藏</div>
          </figcaption>
        </figure>
      </div>
    </header>
    <box-card class="folder-list" title="TA创建的精选集">
      <folder-card v-for="folder of created" :key="folder.id"
                 :docItem="folder"
                 @click.native="viewFolder(folder.id)">
      </folder-card>
      <div class="empty-tip" v-if="!created.length">暂无创建的精选集~</div>
    </box-card>
    <box-card class="folder-list" title="TA收藏的精选集">
      <folder-card v-for="folder of collected" :key="folder.id"
                   :docItem="folder"
                   @click.native="viewFolder(folder.id)">
      </folder-card>
      <div class="empty-tip" v-if="!collected.length">暂无收藏的精选集~</div>
    </box-card>
  </div>
</template>

<script>
  import boxCard from '$@/Stateless/BoxCard'
  import folderCard from '$@/Stateless/LibraryDocs/FolderCard'
  import { getUserInfo, getPersonCollect } from '@/api'

  export default {
    name: 'person-view',
    components: { boxCard, folderCard },
    props: {},
    data () {
      return {
        person: {},
        created: [],
        collected: []
      }
    },
    computed: {
      uid () {
        return this.$route.params.uid
      }
    },
    watch: {
      uid (uid) {
        this.updatePerson(uid)
      }
    },
    mounted () {
      this.updatePerson(this.uid)
    },
    methods: {
      async updatePerson (uid) {
        this.person = await getUserInfo(uid)
        let { created, collected } = await getPersonCollect(uid)
        this.created = created
        this.collected = collected
      },
      back () {
        this.$router.back()
      },
      viewFolder (folderID) {
        this.$router.push({ name: 'folder-view', params: { folderID } })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./person-view"
</style>
