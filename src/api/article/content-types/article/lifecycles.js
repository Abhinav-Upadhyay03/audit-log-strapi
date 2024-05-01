let changedFields = [];
let oldData = {};

module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    strapi.entityService.create("api::audit-log.audit-log", {
      data: {
        contenttype: "Article",

        action: "New Content Entry",

        content: result.Content,

        author: params.data.Author,

        params: params,

        request: event,
      },
    });
  },

  async beforeUpdate(params, data) {
    const previousRecord = await strapi.db
      .query("api::article.article")
      .findOne({
        where: {
          id: params.params.data.id,
        },
      });

    oldData = previousRecord;
  },
  afterUpdate(event) {
    const { result, params } = event;
    const newData = params.data;

    changedFields = [];
    for (const key in newData) {
      if (oldData[key] !== newData[key]) {
        changedFields.push(key);
      }
    }

    strapi.entityService.create("api::audit-log.audit-log", {
      data: {
        contenttype: "Article",
        action: "Update content",
        content: result.Content,
        author: result.Author,
        params: params,
        changedFields: changedFields,
        request: event,
      },
    });
  },

  afterDelete(event) {
    const { result, params } = event;
    strapi.entityService.create("api::audit-log.audit-log", {
      data: {
        contenttype: "Article",

        action: "Delete Content",

        content: result.Content,

        params: params,

        request: event,
      },
    });
  },
};
