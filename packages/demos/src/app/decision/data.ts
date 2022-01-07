import { Tree } from '@xpr/decide';

export interface MyStep {
  icon: string;
  label: string;
  color?: string;
}

export interface MyAnswer {
  icon: string;
  label: string;
  color: string;
}

export const getTreeData = (): Tree<MyStep, MyAnswer> => ({
  id: 'root',
  item: {
    icon: '',
    label: 'Root',
  },
  children: [
    {
      id: 'a',
      item: {
        icon: 'folder',
        label: 'Colors',
      },
      children: [
        {
          id: 'a.a',
          item: {
            icon: 'folder',
            label: 'RED',
            color: 'red',
          },
          children: [
            {
              id: 'a.a.a',
              item: {
                icon: 'folder',
                label: 'YELLOW',
                color: 'yellow',
              },
              children: [
                {
                  id: 'a.a.a.a',
                  item: {
                    icon: 'folder',
                    label: 'ORANGE',
                    color: 'orange',
                  }
                }
              ]
            },
            {
              id: 'a.a.b',
              item: {
                icon: 'folder',
                label: 'BLUE',
                color: 'blue',
              },
              children: [
                {
                  id: 'a.a.b.a',
                  item: {
                    icon: 'folder',
                    label: 'PURPLE',
                    color: 'purple',
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'a.b',
          item: {
            icon: 'folder',
            label: 'GREEN',
            color: 'green',
          },
        },
        {
          id: 'a.c',
          item: {
            icon: 'folder',
            label: 'BLUE',
            color: 'blue',
          },
        }
      ]
    },
    {
      id: 'b',
      item: {
        icon: 'folder',
        label: 'B',
      },
      children: [
        {
          id: 'b.a',
          item: {
            icon: 'folder',
            label: 'B.A',
          },
          children: [
            {
              id: 'b.a.a',
              item: {
                icon: 'folder',
                label: 'B.A.A',
              },
              children: [
                {
                  id: 'b.a.a.a',
                  item: {
                    icon: 'folder',
                    label: 'B.A.A.A',
                  },
                  children: [
                    {
                      id: 'b.a.a.a.a',
                      item: {
                        icon: 'folder',
                        label: 'B.A.A.A.A :) :) :)',
                        color: 'red',
                      },
                    }
                  ]
                },
                {
                  id: 'b.a.a.b',
                  item: {
                    icon: 'folder',
                    label: 'B.A.A.B',
                  },
                },
                {
                  id: 'b.a.a.c',
                  item: {
                    icon: 'folder',
                    label: 'B.A.A.C',
                  },
                }
              ]
            },
            {
              id: 'b.a.b',
              item: {
                icon: 'folder',
                label: 'B.A.B',
              },
            },
            {
              id: 'b.a.c',
              item: {
                icon: 'folder',
                label: 'B.A.C',
              },
            }
          ]
        },
        {
          id: 'b.b',
          item: {
            icon: 'folder',
            label: 'B.B',
          },
          children: [
            {
              id: 'b.b.a',
              item: {
                icon: 'folder',
                label: 'B.B.A',
              },
            },
            {
              id: 'b.b.b',
              item: {
                icon: 'folder',
                label: 'B.B.B',
              },
            },
            {
              id: 'b.b.c',
              item: {
                icon: 'folder',
                label: 'B.B.C',
              },
            }
          ]
        },
        {
          id: 'b.c',
          item: {
            icon: 'folder',
            label: 'B.C',
          },
          children: [
            {
              id: 'b.c.a',
              item: {
                icon: 'folder',
                label: 'B.C.A',
              },
            },
            {
              id: 'b.c.b',
              item: {
                icon: 'folder',
                label: 'B.C.B',
              },
            },
            {
              id: 'b.c.c',
              item: {
                icon: 'folder',
                label: 'B.C.C',
              },
            }
          ]
        }
      ]
    },
    {
      id: 'c',
      item: {
        icon: 'folder',
        label: 'C',
      },
      children: []
    }
  ]
});
