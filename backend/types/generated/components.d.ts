import type { Schema, Attribute } from '@strapi/strapi';

export interface PlayLinkPlayLink extends Schema.Component {
  collectionName: 'components_play_link_play_links';
  info: {
    displayName: 'PlayLink';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    name: Attribute.String;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<true>;
    note: Attribute.String & Attribute.Private;
  };
}

export interface SubcategoriesSubcategories extends Schema.Component {
  collectionName: 'components_subcategories_subcategories';
  info: {
    displayName: 'subcategories';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    typeUrl: Attribute.String;
    maccmsID: Attribute.Integer;
  };
}

export interface TagsTag extends Schema.Component {
  collectionName: 'components_tags_tags';
  info: {
    displayName: 'tag';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'play-link.play-link': PlayLinkPlayLink;
      'subcategories.subcategories': SubcategoriesSubcategories;
      'tags.tag': TagsTag;
    }
  }
}
