// template routes
export const TEMPLATE_BASE = "/template";

export const GET_ALL_TEMPLATES = `${TEMPLATE_BASE}`;
export const GET_ALL_TEMPLATES_LEGACY = "/template/getalltemplates";
export const ADD_TEMPLATE = `${TEMPLATE_BASE}`;
export const ADD_TEMPLATE_LEGACY = "/template/addtemplate";
export const UPDATE_TEMPLATE = (id: string) => `${TEMPLATE_BASE}/${id}`;
export const UPDATE_TEMPLATE_LEGACY = "/template/updatetemplate";
export const DELETE_TEMPLATE = (id: string) => `${TEMPLATE_BASE}/${id}`;
export const DELETE_TEMPLATE_LEGACY = "/template/deletetemplate";

// users related routes