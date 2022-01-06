import { DecisionItem } from '@xpr/decision';

export const getTreeData = (): DecisionItem<string, string> => ({
  id: 'root',
  item: 'description of this item',
  children: [
    {
      id: 'a',
      item: 'item a',
      children: [
        {
          id: 'a.a',
          item: 'item a.a'
        },
        {
          id: 'a.b',
          item: 'item a.b'
        },
        {
          id: 'a.c',
          item: 'item a.c'
        }
      ]
    },
    {
      id: 'b',
      item: 'item b',
      children: [
        {
          id: 'b.a',
          item: 'item b.a',
          children: [
            {
              id: 'b.a.a',
              item: 'item b.a.a',
              children: [
                {
                  id: 'b.a.a.a',
                  item: 'item b.a.a.a',
                  children: [
                    {
                      id: 'b.a.a.a.a',
                      item: 'this is your solution :)'
                    }
                  ]
                },
                {
                  id: 'b.a.a.b',
                  item: 'item b.a.a.b'
                },
                {
                  id: 'b.a.a.c',
                  item: 'item b.a.a.c'
                }
              ]
            },
            {
              id: 'b.a.b',
              item: 'item b.a.b'
            },
            {
              id: 'b.a.c',
              item: 'item b.a.c'
            }
          ]
        },
        {
          id: 'b.b',
          item: 'item b.b',
          children: [
            {
              id: 'b.b.a',
              item: 'item b.b.a'
            },
            {
              id: 'b.b.b',
              item: 'item b.b.b'
            },
            {
              id: 'b.b.c',
              item: 'item b.b.c'
            }
          ]
        },
        {
          id: 'b.c',
          item: 'item b.c',
          children: [
            {
              id: 'b.c.a',
              item: 'item b.c.a'
            },
            {
              id: 'b.c.b',
              item: 'item b.c.b'
            },
            {
              id: 'b.c.c',
              item: 'item b.c.c'
            }
          ]
        }
      ]
    },
    {
      id: 'c',
      item: 'item c',
      children: []
    }
  ]
});
