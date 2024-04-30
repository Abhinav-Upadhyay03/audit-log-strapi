module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    strapi.entityService.create("api::audit-log.audit-log", {
      data: {
        contenttype: "Article",

        action: "New Content Entry",

        content: result.Content,

        author: result.createdBy,

        params: params,

        request: event,
      },
    });
  },
  afterUpdate(event) {
    const { result, params } = event;

    strapi.entityService.create("api::audit-log.audit-log", {
      data: {
        contenttype: "Article",

        action: "Update content",

        content: result.Content,

        author: result.createdBy,

        params: params,

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
