type BlockType =
  'HTML'
  |'IMAGE'
  |'VIDEO'

const myROSet: ReadonlySet<BlockType> = new Set(['HTML','IMAGE','VIDEO'] as const);
const mySetRO: Readonly<Set<BlockType>> = new Set(['HTML','IMAGE','VIDEO'] as const);

const vvv = myROSet.has('HTML');

//ReadonlySet<T> is not the same as Readonly<Set>. Here's one big difference:
//myROSet.add
mySetRO.add

//Surely, you didn't pass me a thing with an '.add' method I wasn't supposed to really use?
//There's an adage that "prioritize code that's easier to read over easier to write". I don't want
//to say that this is a bad maxim, but I think there's another level it misses: Code
//you don't _have_ to read. ReadonlySet communicates something that Readonly<Set> does not:
//"Don't F around with this. I mean it." and it does so in a way that makes it so we _don't
//have to read the code from the provider_ to know that.

//What are we sacrificing or trading away?

/**
 * Who cares about this? What could possibly go wrong?
 * Let me provide a simple (if somewhat contrived) example to demonstrate:
 */

const normalNumberSet: Readonly<Set<number>> = new Set([1,2,3,4,5,6] as const);
const readOnlySetOfNumbers: ReadonlySet<number> = new Set([1,2,3,4,5,6] as const);

setInterval((  )=>{ if(normalNumberSet.has(7)){ console.error('chaos');}}, 5000);
setInterval((  )=>{ if(readOnlySetOfNumbers.has(7)){ console.error('chaos'); }}, 5000);


normalNumberSet.add(7);

const normalNumberUnionSet: Readonly<Set<1|2|3|4|5|6>> = new Set([1,2,3,4,5,6] as const);

normalNumberUnionSet.add(7 as (typeof normalNumberUnionSet) extends Set<infer T> ? T : never);


