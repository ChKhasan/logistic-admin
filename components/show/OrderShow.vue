<template>
  <div class="wrap">
    <div class="cardo">
      <div class="section">
        <h4 class="title">О заказе</h4>
        <div class="items">
          <div class="item">
            <p class="question">ID заказа</p>
            <p class="answer">{{ order?.id }}</p>
          </div>
          <div class="item">
            <p class="question">Дата создания</p>
            <p class="answer">
              {{ publishedDate }}
            </p>
          </div>
          <div class="item">
            <p class="question">Клиент</p>
            <p class="answer"> #{{ order?.consumer?.id }} {{ order?.consumer?.lastName }} {{ order?.consumer?.firstName }} <nuxt-link :to="`/users/${order?.consumer?.id}`">Перейти к клиенту</nuxt-link></p>
          </div>
          <div class="item">
            <p class="question">Телефон клиента</p>
            <p class="answer">+{{ order?.consumer?.phoneNumber }}</p>
          </div>
        </div>
      </div>
      <div class="section">
        <h4 class="title">Адреса</h4>
        <div class="d-flex flex-column">
          <div class="item">
            <p class="question">Откуда</p>
            <p class="answer">{{ order?.fromAddress || '----' }}</p>
          </div>
          <div class="item mt-4">
            <p class="question">Куда</p>
            <p class="answer">
              {{order?.toAddress || '----'}}
            </p>
          </div>

        </div>
      </div>

      <div class="section">
        <h4 class="title">Файлы к задаче</h4>
        <div class="files">
          <div class="file" v-for="image in order?.vehicles">
            <div class="img">
              <img v-if="image.image?.showUrl" :src="image.image?.showUrl" alt="" />
              <img v-else src="../../assets/images/photo_2023-03-04_13-28-58.jpg" alt="" />
            </div>
            <p class="name">{{ image?.name }}</p>
             <p class="size">{{ image?.size }}</p>
          </div>
        </div>
      </div>
      <div class="section">
      <h4 class="title">Дополнительная информация</h4>
      <div class="items">
        <div class="item">
          <p class="question">Сумма заказа</p>
          <p class="answer">{{ order?.price?.toLocaleString() }} сум</p>
        </div>
        <div class="item">
          <p class="question">Способ оплачен</p>
          <p class="answer">
            {{ order?.paymentType === 'CACHE' ? 'Наличные':'Оплачено картой' }}
          </p>
        </div>
        <div class="item">
          <p class="question">Дата оптравки</p>
          <p class="answer"> {{ moment(order?.createdAt).format('HH:mm DD.MM.YYYY') }} </p>
        </div>
        <div class="item">
          <p class="question">Тип груза</p>
          <p class="answer"><span v-for="type in order?.loadType" :key="type?.id">{{type?.name}}, </span></p>
        </div>
        <div class="item">
          <p class="question">Вес груза</p>
          <p class="answer">{{ order?.weight || '---' }}</p>
        </div>
      </div>
        <p class="question">Комментария к заказу</p>
        <p class="answer mt-2">{{order?.comment}}</p>
    </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["order"],
  computed: {
    publishedDate() {
      return moment(this.order.created_at).format("HH:mm DD.MM.YYYY");
    },
    baseUrl() {
      return process.env.BASE_URL;
    },
    imgUrl() {
      return this.baseUrl + "/storage/";
    },
    orderSpecialities() {
      return this.order?.specialities && this.order?.specialities[0]?.name_ru
    }
  },
  methods: {
    moment,
  },
};
</script>

<style scoped>
.title {
  color: var(--Dark-Blue, #32324d);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 133.333% */
  margin-bottom: 16px;
}
.items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
}
.item {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
}
.question {
  color: #5D5D5F;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.answer {
  color: #1C1C29;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
}
.section {
  margin-bottom: 40px;
  max-width: 770px;
}
.section:last-child {
  margin-bottom: 0;
}
.desc p {
  color: var(--grey-80, #353437);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.desc p:last-child {
  margin: 0;
}
.desc a {
  color: var(--Agro-Blue, #3c4bdc);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
.files {
  display: flex;
  align-items: center;
  gap: 16px;
}
.img {
  width: 104px;
  height: 104px;
  border-radius: 4px;
  border: 1px solid var(--grey-8, #ebebeb);
  overflow: hidden;
  margin-bottom: 8px;
}
.img img {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name {
  color: var(--grey-80, #353437);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 15.6px */
}
.cats {
  display: flex;
  align-items: center;
  gap: 8px;
}
.slash {
  margin-left: 8px;
}
.cat {
  border-radius: 22px;
  background: var(--BG-grey, #f8f9ff);
  padding: 8px 16px;
  color: var(--grey-64, #5d5d5f);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
}
.categories {
  padding-bottom: 48px;
}
</style>
