async function* asyncChan() {
  yield 1;
  await delay()
  yield 2;
  await delay()
  return 3
}

function delay() {
  return new Promise(
    function(resolve) {
      setTimeout(resolve, 0)
    }
  )
}

async function main() {
  const iterable = asyncChan()
  console.log(iterable)
  
  let next = iterable.next()
  console.log(next)
  let resolved = await next
  console.log(resolved)
  
  next = iterable.next()
  console.log(next)
  resolved = await next
  console.log(resolved)
  
  next = iterable.next()
  console.log(next)
  resolved = await next
  console.log(resolved)
  
}

const channelDeux = asyncChan();
console.log(channelDeux[Symbol.iterator], channelDeux[Symbol.asyncIterator])
async function* testGenerator() {
  yield* channelDeux;
}
function* testGeneratorDeux() {
  yield* channelDeux;
}
const testIterator = testGenerator();
console.log('testIterator:', testIterator)
console.log(testIterator.next())

const testIteratorDeux = testGeneratorDeux();
console.log('testIteratorDeux:', testIteratorDeux)
try {
  console.log(testIteratorDeux.next())
}
catch(e) {
  console.error('Under the hood, the synchronous generator tries to grab the [Symbol.iterator] from the async generator, but it offers a [Symbol.asyncIterator] instead')
}
