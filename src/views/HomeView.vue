<script setup>
import VueWordCloud from 'vuewordcloud';
import {useFilesStore} from "@/stores/files.js";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {Carousel, Navigation, Slide} from 'vue3-carousel'

import meeting_report from '../assets/data/meeting_report.json'
import source from '../assets/data/data.json'

const filesStore = useFilesStore();
const {showcase} = storeToRefs(filesStore);
const isLoading = ref(false);

const words = ref([]);
const colors = ref(['rgb(59, 196, 199)', 'rgb(255, 208, 119)', 'rgb(255, 78, 105)', 'rgb(70, 30, 71)', 'rgb(58, 158, 234)']);

const lists = ref();

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([
   // useFilesStore().getSource(),
    useFilesStore().getShowcase(),
  ])

  let list = {};
  showcase.value.map(data => {
    let type = data['type'];
    if (list[type]) {
      list[type] += 1;
    } else {
      list[type] = 1;
    }
  })

  words.value = (Object.entries(list));
  lists.value = list;

  isLoading.value = false;
})

const getImageCover = (index) => {
  let id = Number(index);
  return `https://open.thaith.ai/parliamenthack/storage/thumbnail/${id < 10 ? '0' + id : id}.png`;
}


const getSlide = (index) => {
  let id = Number(index);
  return `https://open.thaith.ai/parliamenthack/storage/slide/${id < 10 ? '0' + id : id}.pdf`;
}

</script>

<template>
  <main>

    <section class="hero position-relative">
      <div class="text-center">
        <img class="img-fluid w-100"
             style="max-width: 350px"
             src="../assets/images/Logo_OPENParliamentHackathon2024_white.png">
      </div>
      <div class="position-absolute" style="bottom: 20px; left: calc(50vw - 20px);">
        <img src="@/assets/icons/arrow-down.svg" width="30" alt="">
      </div>
    </section>

    <div class="container">
      <section>
        <div>
          <h3>Brief</h3>
        </div>
        <div class="row">
          <div class="col-6">
            <img class="img-fluid w-100" src="../assets/images/Brief_Parliament_2024.png">
          </div>
          <div class="col-6">
            <img class="img-fluid w-100" src="../assets/images/Brief_Parliament_2024_02.png">
          </div>
          <div class="col-12">
            <a class="btn btn-primary mt-3 w-100"
               href="https://docs.google.com/presentation/d/16L-ZwdTgEGOsJTNMe_bsFzvhoirUiwut_Kx7-em8cJc/mobilepresent?slide=id.p"
               target="_blank">Link</a>
          </div>
        </div>
      </section>

      <section>
        <h3>
          Data Source
        </h3>

        <div class="row source mb-5" v-if="!isLoading">
          <div class="col-6 col-md" v-for="(data,index) of source" :key="index" v-if="source.length > 0">

            <h4 class="title mb-2 py-3">
              {{ data.title }}
            </h4>

            <div class="content border border-primary p-3 d-flex flex-column justify-content-between">

              <div class="text-center">
                <div v-html="data.description"/>
              </div>

              <a v-if="data.link" class="btn btn-primary mt-3" :href="data.link" target="_blank">Link</a>

              <div v-for="(item,item_index) in data.items" :key="item_index" class="btn btn-primary">
                <a class="text-white text-decoration-none" :href="item.link" target="_blank"> {{ item.year }}</a>
              </div>

            </div>
          </div>

        </div>
      </section>


      <section>
        <h3>
          บันทึกคำต่อคำประชุมร่างรัฐธรรมนูญ 60
        </h3>

        <div class="row source mb-5" v-if="!isLoading">
          <div class="col-6 col-md-3" v-for="(data,index) of meeting_report" :key="index" v-if="source.length > 0">

            <h5 class="title mb-2 py-3">
              {{ data.title }}
            </h5>

            <div class="content border border-primary p-3 d-flex flex-column justify-content-between">

              <div class="text-center">
                <div v-html="data.description"/>
              </div>

              <a v-if="data.link" class="btn btn-primary mt-3" :href="data.link" target="_blank">Link</a>

              <div v-for="(item,item_index) in data.items" :key="item_index" class="btn btn-primary">
                <a class="text-white text-decoration-none" :href="item.link" target="_blank"> {{ item.year }}</a>
              </div>

            </div>
          </div>

        </div>
      </section>


      <section>
        <h3>
          นโยบายรัฐสภาดิจิทัล
        </h3>

        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/bO2G6mBOEPw?si=j1WaqXLjyl9HFXtv"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>


        <div class="card  custom-card mb-3">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Document</div>
              <a class="text-primary fw-bold text-decoration-none" target="_blanks"
                 href="https://docs.google.com/document/d/1ovB0fmw83W9irjPvS7JfquJKNkdDWWyYaMNtpsUwUBc/edit?fbclid=IwY2xjawEdlNdleHRuA2FlbQIxMAABHXtiM5PckP0IJJ3CtZzIgvIk8xauI1NpR5lchTyvd_bd4Ofqd0XvrsmGvA_aem_jdutMpA7mwxQAyVGUWJJdg">
                นโยบายรัฐสภาดิจิทัล 2567-2570</a>
            </div>
          </div>
        </div>

      </section>

      <section>
        <h3>
          โครงการ ICT รัฐสภา
        </h3>

        <div class="card  custom-card mb-3">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Document</div>
              <a class="text-primary fw-bold text-decoration-none" target="_blanks"
                 href="https://open.thaith.ai/parliamenthack/files/สำนักงานเลขาธิการสภาผู้แทนราษฎร.pdf">
                สำนักงานเลขาธิการสภาผู้แทนราษฎร</a>
            </div>
          </div>
        </div>

        <div class="card  custom-card">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Document</div>
              <a class="text-primary fw-bold text-decoration-none" target="_blanks"
                 href="https://open.thaith.ai/parliamenthack/files/สำนักงานเลขาธิการวุฒิสภา.pdf">
                สำนักงานเลขาธิการวุฒิสภา</a>
            </div>
          </div>
        </div>

      </section>


      <section v-if="showcase.length > 0">
        <h3>
          #ParliamentHack Idea
        </h3>

        <Carousel :wrap-around="true">
          <Slide v-for="slide in showcase" :key="slide">
            <div class="carousel__item">

              <div class="text-primary fw-bold mb-3">
                {{ slide['name'] }}
              </div>

              <div style="max-width: 450px; white-space: pre-line">
                {{ slide['idea'] }}
              </div>

            </div>
          </Slide>

          <template #addons>
            <Navigation/>
          </template>
        </Carousel>
      </section>


      <section v-if="showcase.length > 0">
        <h3>
          #ParliamentHACK Theme
        </h3>
        <vue-word-cloud
            style="height: 400px; overflow: hidden"
            :words="words"
            :color="([, weight],index) => {
              return colors[index];
            }"
            font-family="Prompt"
        />
      </section>


      <section>
        <h3>
          #ParliamentHack Video
        </h3>


        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/MU74d_at4eg?si=afgfR2oq8gMQTFea"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/DDQUmojDGQ4?si=DxPjC8n8OSTaVkSY"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/IHNecfYg8nU?si=aB2bmzB-mOVwdjQ9"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/aSP0O9MluFU?si=Uy7rAUqZiQd3JdIE"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="ratio ratio-16x9 mb-3">
              <iframe src="https://www.youtube.com/embed/5gEegbaRwX8?si=XNvh2J5k6K12lN_I"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>


        <div class="card  custom-card">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Youtube</div>
              <a class="text-primary fw-bold text-decoration-none small" target="_blank"
                 href="https://www.youtube.com/channel/UCUfoXv7eBeJ0i9X9xBsrJFg">
                Parliament HACK</a>
            </div>
          </div>
        </div>


      </section>


      <section v-if="showcase.length > 0">
        <h3>
          #ParliamentHack
        </h3>
        <div class="row showcase" v-if="!isLoading">

          <div class="col-6 col-sm-4 mb-5" v-for="(data,index_showcase) of showcase" :key="index_showcase"
               v-if="showcase.length > 0">

            <div class="card h-100">
              <div class="img-cover mb-2"
                   v-bind:style="{ backgroundImage: 'url(' + getImageCover(data.id) +'' }"/>

              <div class="card-body">
                <div class="badge bg-primary small mb-3"> {{ data['type'] }}</div>

                <div class="project"> {{ data['name'] }}</div>

                <div class="description mb-3"> {{ data['idea'] }}</div>

                <div class="d-flex gap-3">
                  <a class=" btn btn-primary" :href="getSlide(data.id)" target="_blank"> Slide</a>
                  <a class=" btn btn-primary" :href="data.demo" v-if="data.demo" target="_blank"> Demo</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <h3>
          #ParliamentHACK Opensource
        </h3>

        <div class="card custom-card">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Github</div>
              <a class="text-primary fw-bold text-decoration-none" href="https://github.com/ParliamentHACKTH"
                 target="_blank">
                ParliamentHACKTH</a>
            </div>
          </div>

        </div>

      </section>

      <section>
        <h3>
          ส่งความคิดเห็นเพื่อให้สภาของเราดีขึ้นได้ที่
        </h3>

        <div class="card  custom-card">
          <div class="row align-items-center flex-nowrap">
            <div class="col-auto col-sm-auto pe-0">
              <img class="img-fluid github-cover" src="https://avatars.githubusercontent.com/u/177630835?s=280&amp;v=4"
                   alt="ParliamentHACKTH">
            </div>

            <div class="col ps-0">
              <div class="text-secondary small">Email</div>
              <a class="text-primary fw-bold text-decoration-none" href="mailto:hackathon@parliament.go.th">
                hackathon@parliament.go.th</a>
            </div>
          </div>
        </div>
      </section>


    </div>

    <div class="footer">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-auto">
            <a href="https://www.facebook.com/people/Parliament-HACK/61563909627817/"
               target="_blank">
              <img class="icon" src="../assets/icons/facebook.png">
            </a>
          </div>


          <div class="col-auto">
            <a href="https://www.tiktok.com/@parliamenthack"
               target="_blank">
              <img class="icon" src="../assets/icons/tiktok.png">
            </a>
          </div>


          <div class="col-auto">
            <a href="https://x.com/ParlimentHACK"
               target="_blank">
              <img class="icon" src="../assets/icons/x.png">
            </a>
          </div>

          <div class="col-auto">
            <a href="https://www.instagram.com/parliamenthack/"
               target="_blank">
              <img class="icon" src="../assets/icons/instagram.png">
            </a>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>
