const defaultRichText = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            type: 'text',
            version: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

const defaultBulletList = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                type: 'text',
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'listitem',
            version: 1,
            value: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        type: 'list',
        version: 1,
        listType: 'bullet',
        start: 1,
        tag: 'ul',
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

export const defaults = {
  image: '691c68822b8e4e51b55b601d',
  heading: 'Heading',
  type: 'residential',
  date: '2024',
  location: 'Location',
  description: defaultRichText,
  collaborators: defaultBulletList,
  scope: defaultBulletList,
  features: defaultBulletList,
  testimonials: ['69122c3d581433e6afea38b1', '69122c3d581433e6afea38b1'],
  backgroundImage: '69203ad68858f02bb2e58478',
}
