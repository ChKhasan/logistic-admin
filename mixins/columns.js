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
                    key: 'orderId'
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
                    customRender: (text) => text ? text?.toLocaleString() : '----',
                    className: "column-name",
                    key: 'price'
                },
                {
                    title: "Время отправки",
                    dataIndex: "sendAt",
                    customRender: (text) => moment(text).format("HH:mm DD.MM.YYYY"),
                    className: "column-date",
                    key: 'sendAt'
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

                    className: "column-client",
                    key: "consumer",
                },
                {
                    title: "Водитель - ID",
                    scopedSlots: {customRender: "driver"},
                    className: "column-client",
                    key: "driver",
                },
                {
                    title: "Вид транспорта",
                    dataIndex: "vehicle",
                    scopedSlots: {customRender: "vehicle"},
                    customRender: (text) => text ? text?.name : '----',
                    className: "column-text",
                    key: "vehicle",
                    align: "center",
                },
                {
                    fixed: "right",
                    title: "ДЕЙСТВИЯ",
                    key: "id",
                    dataIndex: "id",
                    scopedSlots: {customRender: "btn"},
                    className: "column-btns",
                    width: "100px",
                    align: "center",
                },
            ],
            columnsDriverOrders: [
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
                    customRender: (text) => text ? text?.toLocaleString() : '----',
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
                    title: "Дата начала",
                    dataIndex: "sendAt1",
                    customRender: (text) => moment(text).format("HH:mm DD.MM.YYYY"),
                    className: "column-date",
                },
                {
                    title: "Дата выполнения",
                    dataIndex: "sendAt2",
                    customRender: (text) => text ? moment(text).format("HH:mm DD.MM.YYYY") : '----',
                    className: "column-date",
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
            columnsDrivers: [
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
                    customRender: (item) => `${item?.firstName} ${item?.lastName}`
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
                    title: "Авто транспорт",
                    customRender: (text) => `${text?.vehicle?.name} ${text?.vehicleCode}`,
                    className: "column-name",
                },
                {
                    title: "Водительский балл",
                    scopedSlots: {customRender: "score"},
                    className: "column-date cursor-pointer",
                    key: "score"
                },
                {
                    title: "Дата регистрации",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    className: "column-date",
                    key: "createdAt",
                },


                // {
                //   title: "Рейтинг",
                //   dataIndex: "stars",
                //   scopedSlots: {customRender: "stars"},
                //   className: "column-name",
                //   customRender: (text) => `4.5`,
                //   key: "stars",
                // },
                {
                    title: "Активные заказы",
                    dataIndex: "activeOrders",
                    customRender: (text) => text.length > 0 ? text : '----',
                    className: "column-client",
                    key: "activeOrders",
                },
                {
                    title: "Актив",
                    dataIndex: "isActive",
                    scopedSlots: {customRender: "isActive"},
                    className: "column-tags",
                    key: "isActive",
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
            columnsDriverApp: [
                {
                    title: "№",
                    dataIndex: "key",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "Заказ №",
                    scopedSlots: {customRender: "order_id"},
                    className: "column-name cursor-pointer",
                    key: "order_id",
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
                    title: "Время отправки",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    className: "column-date",
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    key: "createdAt",
                },
                {
                    title: "способ оплаты",
                    dataIndex: "paymentType",
                    className: "column-text",
                    key: "paymentType",
                },
                {
                    title: "Цена - Клиент",
                    dataIndex: "orderPrice",
                    scopedSlots: {customRender: "orderPrice"},
                    className: "column-text",
                    customRender: (text) => text?.toLocaleString(),
                    key: "orderPrice",
                },
                {
                    title: "Цена - вожитель",
                    dataIndex: "price",
                    scopedSlots: {customRender: "price"},
                    className: "column-date",
                    customRender: (text) => text.toLocaleString(),
                    key: "price",
                },
                {
                    title: "Дата подачи",
                    dataIndex: "sendAt",
                    scopedSlots: {customRender: "createdAt"},
                    className: "column-date",
                    customRender: (text) => text ? moment(text).format("DD.MM.YYYY") : '----',
                    key: "sendAt",
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
            columnsDriverComp: [
                {
                    title: "№",
                    dataIndex: "key",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "Джалоба по заказу",
                    dataIndex: 'orderId',
                    scopedSlots: {customRender: "order_id"},
                    className: "column-name cursor-pointer",
                    key: "order_id",
                },

                {
                    title: "Клиент",
                    scopedSlots: {customRender: "client"},
                    className: "column-name",
                    key: "client",
                },
                {
                    title: "Время отправки",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    className: "column-date",
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    key: "createdAt",
                },
                {
                    title: "Причина джалоби",
                    dataIndex: "complain",
                    scopedSlots: {customRender: "complain"},
                    className: "column-name",
                    key: "complain",
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
                },],
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
                    dataIndex: "activeOrders",
                    scopedSlots: {customRender: "activeOrders"},
                    customRender: (text) => text ? text.join(",") : '----',
                    className: "column-client",
                    key: "activeOrders",
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
                    scopedSlots: {customRender: "driver"},
                    className: "column-name cursor-pointer",
                    key: "driver",
                },
                {
                    title: "Номер телефона",
                    scopedSlots: {customRender: "phone"},
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
                    customRender: (text) => `${text?.driver ? text?.driver?.vehicle?.name + "  " + text?.driver?.vehicleCode : "----"}`,
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
                    customRender: (text) => text ? text.toLocaleString() : '----',

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
                    customRender: (text) => text ? text?.toLocaleString() : '----',
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
                    scopedSlots: {customRender: "driver"},
                    className: "column-client",
                    key: "client",
                },
                {
                    title: "Вид транспорта",
                    dataIndex: "vehicle",
                    scopedSlots: {customRender: "vehicle"},
                    customRender: (text) => text ? text?.name : '----',
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
            columnsConsumerComp: [
                {
                    title: "№",
                    dataIndex: "key",
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "orderId"},
                    className: "column-service",
                },
                {
                    title: "Джалоба по заказу",
                    dataIndex: 'orderId',
                    scopedSlots: {customRender: "order_id"},
                    className: "column-name cursor-pointer",
                    key: "order_id",
                },

                {
                    title: "Водитель",
                    scopedSlots: {customRender: "driver"},
                    className: "column-name",
                    key: "driver",
                },
                {
                    title: "Время отправки",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    className: "column-date",
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    key: "createdAt",
                },
                {
                    title: "Причина джалоби",
                    dataIndex: "complain",
                    scopedSlots: {customRender: "complain"},
                    className: "column-name",
                    key: "complain",
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
                },],
            columnsBalance: [
                {
                    title: "№",
                    dataIndex: 'key',
                    slots: {title: "customTitle"},
                    scopedSlots: {customRender: "key"},
                    className: "column-service",
                    width: "60px",
                },
                {
                    title: "Сумма ",
                    dataIndex: 'amount',
                    className: "column-service",
                    scopedSlots: {customRender: "price"},
                    key: 'price',
                },
                {
                    title: "Направление ",
                    dataIndex: 'description',
                    className: "column-text",
                    key: 'description',
                },
                {
                    title: "Способ пополнения ",
                    dataIndex: 'type',
                    className: "column-text",
                    key: 'type',
                },
                {
                    title: "Время ",
                    dataIndex: 'createdAt',
                    customRender: (text) => text ? moment(text).format("HH:mm DD.MM.YYYY") : '----',
                    className: "column-text",
                    key: 'createdAt',
                },
                // {
                //   fixed: "right",
                //   title: "ДЕЙСТВИЯ",
                //   key: "id",
                //   dataIndex: "id",
                //   scopedSlots: {customRender: "btns"},
                //   className: "column-btns",
                //   width: "100px",
                //   align: "center",
                // },
            ],
            columnsCompanies: [
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
                    customRender: (item) => `${item?.firstName} ${item?.lastName}`
                },

                {
                    title: "Название компании",
                    dataIndex: "companyName",
                    className: "column-name cursor-pointer",
                    key: 'companyName'
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
                    title: "Оценка компании",
                    scopedSlots: {customRender: "score"},
                    className: "column-date cursor-pointer",
                    key: "score"
                },
                {
                    title: "Должность",
                    dataIndex: "jobTitle",
                    className: "column-name",
                    key:"jobTitle"
                },
                {
                    title: "Дата регистрации",
                    dataIndex: "createdAt",
                    scopedSlots: {customRender: "createdAt"},
                    customRender: (text) => moment(text).format("DD.MM.YYYY"),
                    className: "column-date",
                    key: "createdAt",
                },


                // {
                //   title: "Рейтинг",
                //   dataIndex: "stars",
                //   scopedSlots: {customRender: "stars"},
                //   className: "column-name",
                //   customRender: (text) => `4.5`,
                //   key: "stars",
                // },
                {
                    title: "Активные заказы",
                    dataIndex: "activeOrders",
                    customRender: (text) => text.length > 0 ? text : '----',
                    className: "column-client",
                    key: "activeOrders",
                },
                {
                    title: "Актив",
                    dataIndex: "isActive",
                    scopedSlots: {customRender: "isActive"},
                    className: "column-tags",
                    key: "isActive",
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
        };
    },
};
