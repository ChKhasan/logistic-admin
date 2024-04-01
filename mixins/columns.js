import moment from "moment";

export default {
    data() {
        return {
            columnsOrders: [
                {
                    title: "ID",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                    width: "60px",
                },
                {
                    title: "Откуда",
                    dataIndex: 'regionFromName',
                    className: "column-text cursor-pointer",
                    key: 'regionFromName'
                },
                {
                    title: "Куда",
                    dataIndex: 'regionToName',
                    className: "column-text cursor-pointer",
                    key: 'regionToName'
                },
                {
                    title: "Цена",
                    dataIndex: "price",
                    customRender: (text) => text ? text?.toLocaleString():'----',
                    className: "column-name",
                },
                {
                    title: "Время отправки",
                    dataIndex: "sendAt",
                    customRender: (text) => moment(text).format("HH:mm DD.MM.YYYY"),
                    className: "column-date",
                },
                {
                    title: "Способ оплаты",
                    dataIndex: "paymentType",
                    className: "column-text",
                    key: "paymentType",
                },
                {
                    title: "статус",
                    dataIndex: 'status',
                    scopedSlots: {customRender: "status"},
                    className: "column-tags",
                    key: "status",
                    align: "center",
                },
                {
                    title: "Заявки",
                    dataIndex: "offerCount",
                    scopedSlots: {customRender: "offerCount"},
                    className: "column-text",
                    key: "offerCount",
                    align: "center"
                },
                {
                    title: "Клиент - ID",
                    dataIndex: "consumer",
                    scopedSlots: {customRender: "consumer"},
                    customRender: (text) =>
                        text ? `${text?.firstName} - ${text?.id}` : "----",
                    className: "column-client",
                    key: "selected_request",
                },
                {
                    title: "Водитель - ID",
                    dataIndex: "driver",
                    scopedSlots: {customRender: "driver"},
                    customRender: (text) => text ? `${text?.firstName} - ${text?.id}`:'----',
                    className: "column-client",
                    key: "client",
                },
                {
                    title: "Вид транспорта",
                    dataIndex: "vehicle",
                    scopedSlots: {customRender: "vehicle"},
                    customRender: (text) => text ? text?.name:'----',
                    className: "column-text",
                    key: "vehicle",
                    align: "center",
                },
                {
                    fixed: "right",
                    title: "ДЕЙСТВИЯ",
                    key: "id",
                    dataIndex: "id",
                    scopedSlots: {customRender: "btns"},
                    className: "column-btns",
                    width: "100px",
                    align: "center",
                },
            ],
            columnsFreelancers: [
                {
                    title: "ID",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "F.I.SH",
                    scopedSlots: {customRender: "name"},
                    className: "column-name cursor-pointer",
                },
                {
                    title: "Номер телефона",
                    dataIndex: "phoneNumber",
                    scopedSlots: {customRender: "phoneNumber"},
                    customRender: (text) => "+" + text,
                    className: "column-text",
                    key: "phone",
                },


                {
                    title: "Тип активности",
                    dataIndex: "specialities",
                    scopedSlots: {customRender: "specialities"},
                    customRender: (text) => `Erkin haydovchi`,
                    className: "column-name",
                    key: "specialities",
                },
                {
                    title: "Авто транспорт",
                    dataIndex: "region",
                    scopedSlots: {customRender: "region"},
                    customRender: (text) => `Shalandra 01 A 878 BB`,
                    className: "column-name",
                },
                {
                    title: "Дата регистрации",
                    dataIndex: "register_at",
                    scopedSlots: {customRender: "register_at"},
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    className: "column-date",
                    key: "register_at",
                },


                {
                    title: "Рейтинг",
                    dataIndex: "stars",
                    scopedSlots: {customRender: "stars"},
                    className: "column-name",
                    customRender: (text) => `4.5`,
                    key: "stars",
                },
                {
                    title: "Активные заказы",
                    dataIndex: "age",
                    scopedSlots: {customRender: "age"},
                    customRender: (text) => `#656`,
                    className: "column-client",
                    key: "age",
                },
                {
                    title: "Актив",
                    dataIndex: "online",
                    scopedSlots: {customRender: "online"},
                    className: "column-tags",
                    key: "online",
                },
                {
                    title: "ДЕЙСТВИЯ",
                    key: "id",
                    dataIndex: "id",
                    scopedSlots: {customRender: "btns"},
                    className: "column-btns",
                    width: "100px",
                    align: "center",
                },
            ],
            columnsUsers: [
                {
                    title: "ID",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "F.I.SH",
                    scopedSlots: {customRender: "name"},
                    className: "column-name cursor-pointer",
                    customRender: (text) => text?.lastName + " " + text?.firstName,

                },
                {
                    title: "Номер телефона",
                    dataIndex: "phoneNumber",
                    scopedSlots: {customRender: "phoneNumber"},
                    customRender: (text) => "+" + text,
                    className: "column-text",
                    key: "phone",
                },
                {
                    title: "Дата регистрации",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    className: "column-date",
                    key: "createdAt",
                },

                {
                    title: "Активные заказы",
                    dataIndex: "activeOrderId",
                    scopedSlots: {customRender: "activeOrderId"},
                    customRender: (text) => text ? text:'----',
                    className: "column-client",
                    key: "activeOrderId",
                },
                {
                    title: "Актив",
                    dataIndex: "active",
                    scopedSlots: {customRender: "active"},
                    className: "column-tags",
                    key: "active",
                },
                {
                    title: "ДЕЙСТВИЯ",
                    key: "id",
                    dataIndex: "id",
                    scopedSlots: {customRender: "btns"},
                    className: "column-btns",
                    width: "100px",
                    align: "center",
                },
            ],
            columnsOrderApp: [
                {
                    title: "ID",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "Водитель - ID",
                    dataIndex: "driver",
                    scopedSlots: {customRender: "driver"},
                    // customRender: (text) => text?.name,
                    className: "column-name cursor-pointer",
                    key: "driver",
                },
                {
                    title: "Номер телефона",
                    scopedSlots: {customRender: "phone"},
                    customRender: (text) => `${text?.driver ? '+'+text?.driver?.phoneNumber : "----"}`,
                    className: "column-name",
                },
                {
                    title: "Формат",
                    dataIndex: "role",
                    scopedSlots: {customRender: "role"},
                    className: "column-name",
                    key: 'role'
                },
                {
                    title: "Транспорт",
                    scopedSlots: {customRender: "transport"},
                    customRender: (text) => `${text?.driver ? text?.driver?.vehicle?.name+"  "+text?.driver?.vehicleCode : "----"}`,

                    className: "column-text",
                },
                {
                    title: "Время",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    className: "column-date",
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    key: "createdAt",
                },
               
                {
                    title: "Цена",
                    dataIndex: "price",
                    scopedSlots: {customRender: "price"},
                    customRender: (text) => text ? text.toLocaleString():'----',

                    className: "column-name",
                    key: "orders-count",
                },
                {
                    title: "Комментарий ",
                    scopedSlots: {customRender: "text"},
                    className: "column-name",
                    key: "text",
                },
               
            ],
            columnsConsumerOrders: [
                {
                    title: "ID",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                    width: "60px",
                },
                {
                    title: "Откуда",
                    dataIndex: 'regionFromName',
                    className: "column-text cursor-pointer",
                    key: 'regionFromName'
                },
                {
                    title: "Куда",
                    dataIndex: 'regionToName',
                    className: "column-text cursor-pointer",
                    key: 'regionToName'
                },
                {
                    title: "Цена",
                    dataIndex: "price",
                    customRender: (text) => text ? text?.toLocaleString():'----',
                    className: "column-name",
                },
                {
                    title: "Время отправки",
                    dataIndex: "sendAt",
                    customRender: (text) => moment(text).format("HH:mm DD.MM.YYYY"),
                    className: "column-date",
                },
                {
                    title: "Способ оплаты",
                    dataIndex: "paymentType",
                    className: "column-text",
                    key: "paymentType",
                },
                {
                    title: "статус",
                    dataIndex: 'status',
                    scopedSlots: {customRender: "status"},
                    className: "column-tags",
                    key: "status",
                    align: "center",
                },
                {
                    title: "Заявки",
                    dataIndex: "offerCount",
                    scopedSlots: {customRender: "offerCount"},
                    className: "column-text",
                    key: "offerCount",
                    align: "center"
                },
              
                {
                    title: "Водитель - ID",
                    dataIndex: "driver",
                    scopedSlots: {customRender: "driver"},
                    customRender: (text) => text ? `${text?.firstName} - ${text?.id}`:'----',
                    className: "column-client",
                    key: "client",
                },
                {
                    title: "Вид транспорта",
                    dataIndex: "vehicle",
                    scopedSlots: {customRender: "vehicle"},
                    customRender: (text) => text ? text?.name:'----',
                    className: "column-text",
                    key: "vehicle",
                    align: "center",
                },
                {
                    fixed: "right",
                    title: "ДЕЙСТВИЯ",
                    key: "id",
                    dataIndex: "id",
                    scopedSlots: {customRender: "btns"},
                    className: "column-btns",
                    width: "100px",
                    align: "center",
                },
            ],
            columnsComp: []
        };
    },
};
