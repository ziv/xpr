import { Tree } from './interfaces';
import { Decide } from './decide';
import { combineLatest, skip } from 'rxjs';

const data: Tree<string, string> = {
  id: 'root',
  item: 'root',
  children: [
    {
      id: 'child1',
      item: 'child1',
      children: [
        {
          id: 'grandchild1',
          item: 'grandchild1',
          children: [
            {
              id: 'great grandchild1',
              item: 'great grandchild1'
            }
          ]
        },
        {
          id: 'grandchild2',
          item: 'grandchild2',
          children: [
            {
              id: 'great grandchild2',
              item: 'great grandchild2'
            }
          ]
        },
        {
          id: 'grandchild3',
          item: 'grandchild3',
          children: [
            {
              id: 'great grandchild3',
              item: 'great grandchild3'
            }
          ]
        }
      ]
    },
    {
      id: 'child2',
      item: 'child2',
      children: [
        {
          id: 'grandchild3',
          item: 'grandchild3',
          children: [
            {
              id: 'great grandchild3',
              item: 'great grandchild3'
            }
          ]
        },
        {
          id: 'grandchild4',
          item: 'grandchild4',
          children: [
            {
              id: 'great grandchild4',
              item: 'great grandchild4'
            }
          ]
        }
      ]
    }
  ]
};

const stream = (d: Decide) => combineLatest([d.items$, d.first$, d.last$]);


describe('decide', () => {
  it('should stream root children', done => {
    const decide = new Decide(data);
    stream(decide).subscribe(([items, first, last]) => {
      expect(items).toHaveLength(2);
      expect(first).toBeTruthy();
      expect(last).toBeFalsy();
      done();
    });
  });

  describe('clicking next', () => {
    it('should stream next children', done => {
      const decide = new Decide(data);
      stream(decide)
        .pipe(skip(1))
        .subscribe(([items, first, last]) => {
          expect(items).toHaveLength(3);
          expect(first).toBeFalsy();
          expect(last).toBeFalsy();
          done();
        });
      decide.next(data.children[0]);
    });
  });
});
