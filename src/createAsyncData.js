const DEFAULT_METHOD = 'asyncData';
const createAsyncData = options => async function asyncData(to, from, next, component) {
  const {
    store, router, method = DEFAULT_METHOD,
  } = options;
  const matched = router.getMatchedComponents(to);
  const prevMatched = router.getMatchedComponents(from);
  let diffed = false;

  let activated = matched.filter((c, i) => {
    const isActivated = diffed || (diffed = prevMatched[i] !== c);
    return isActivated;
  });

  if (component) {
    activated = [component];
  }

  const asyncDataHooks = [router.app.$options, ...activated]
    .filter(_ => _)
    .map(c => c[method])
    .filter(_ => _);

  if (!asyncDataHooks.length) {
    next();
    return;
  }

  try {
    const hooks = asyncDataHooks
      .map(hook => hook({store, route: to, router}))
      .filter(_ => _);

    await Promise.all(hooks);
    next();
  } catch (e) {
    console.log(e);
    next();
  }
};

export default createAsyncData;
