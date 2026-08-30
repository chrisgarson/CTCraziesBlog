import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import Home from "./pages/Home";
const Page2 = lazy(() => import("./pages/Page2"));
const Page3 = lazy(() => import("./pages/Page3"));
const Page4 = lazy(() => import("./pages/Page4"));
const Page5 = lazy(() => import("./pages/Page5"));
const Page6 = lazy(() => import("./pages/Page6"));
const Page7 = lazy(() => import("./pages/Page7"));
const Page8 = lazy(() => import("./pages/Page8"));
const Page9 = lazy(() => import("./pages/Page9"));
const Page10 = lazy(() => import("./pages/Page10"));
const Page11 = lazy(() => import("./pages/Page11"));
const Page12 = lazy(() => import("./pages/Page12"));
const Page13 = lazy(() => import("./pages/Page13"));
const Page14 = lazy(() => import("./pages/Page14"));
const Page15 = lazy(() => import("./pages/Page15"));
const Page16 = lazy(() => import("./pages/Page16"));
const Page17 = lazy(() => import("./pages/Page17"));
const Page18 = lazy(() => import("./pages/Page18"));
const Page19 = lazy(() => import("./pages/Page19"));
const Page20 = lazy(() => import("./pages/Page20"));
const Page21 = lazy(() => import("./pages/Page21"));
const Page22 = lazy(() => import("./pages/Page22"));
const Page23 = lazy(() => import("./pages/Page23"));
const Page24 = lazy(() => import("./pages/Page24"));
const Page25 = lazy(() => import("./pages/Page25"));
const Page26 = lazy(() => import("./pages/Page26"));
const Page27 = lazy(() => import("./pages/Page27"));
const Page28 = lazy(() => import("./pages/Page28"));
const Page29 = lazy(() => import("./pages/Page29"));
const Page30 = lazy(() => import("./pages/Page30"));
const Page31 = lazy(() => import("./pages/Page31"));
const Page32 = lazy(() => import("./pages/Page32"));
const Page33 = lazy(() => import("./pages/Page33"));
const Page34 = lazy(() => import("./pages/Page34"));
const Page35 = lazy(() => import("./pages/Page35"));
const Page36 = lazy(() => import("./pages/Page36"));
const Page37 = lazy(() => import("./pages/Page37"));
const Page38 = lazy(() => import("./pages/Page38"));
const Page39 = lazy(() => import("./pages/Page39"));
const Page40 = lazy(() => import("./pages/Page40"));
const Page41 = lazy(() => import("./pages/Page41"));
const Page42 = lazy(() => import("./pages/Page42"));
const Page43 = lazy(() => import("./pages/Page43"));
const Page44 = lazy(() => import("./pages/Page44"));
const Page45 = lazy(() => import("./pages/Page45"));
const Page46 = lazy(() => import("./pages/Page46"));
const Page47 = lazy(() => import("./pages/Page47"));
const Page48 = lazy(() => import("./pages/Page48"));
const Page49 = lazy(() => import("./pages/Page49"));
const Page50 = lazy(() => import("./pages/Page50"));
const Page51 = lazy(() => import("./pages/Page51"));
const Page52 = lazy(() => import("./pages/Page52"));
const Page53 = lazy(() => import("./pages/Page53"));
const Page54 = lazy(() => import("./pages/Page54"));
const Page55 = lazy(() => import("./pages/Page55"));
const Page56 = lazy(() => import("./pages/Page56"));
const Page57 = lazy(() => import("./pages/Page57"));
const Page58 = lazy(() => import("./pages/Page58"));
const Page59 = lazy(() => import("./pages/Page59"));
const Page60 = lazy(() => import("./pages/Page60"));
const Page61 = lazy(() => import("./pages/Page61"));
const Page62 = lazy(() => import("./pages/Page62"));
const Page63 = lazy(() => import("./pages/Page63"));
const Page64 = lazy(() => import("./pages/Page64"));
const Page65 = lazy(() => import("./pages/Page65"));
const Page66 = lazy(() => import("./pages/Page66"));
const Page67 = lazy(() => import("./pages/Page67"));
const Page68 = lazy(() => import("./pages/Page68"));
const Page69 = lazy(() => import("./pages/Page69"));
const Page70 = lazy(() => import("./pages/Page70"));
const Page71 = lazy(() => import("./pages/Page71"));
const Page72 = lazy(() => import("./pages/Page72"));
const Page73 = lazy(() => import("./pages/Page73"));
const Page74 = lazy(() => import("./pages/Page74"));
const Page75 = lazy(() => import("./pages/Page75"));
const Page76 = lazy(() => import("./pages/Page76"));
const Search = lazy(() => import("./pages/Search"));
const TagResults = lazy(() => import("./pages/TagResults"));
const TagsIndex = lazy(() => import("./pages/TagsIndex"));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading page…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        <Route path="/page4" component={Page4} />
        <Route path="/page5" component={Page5} />
        <Route path="/page6" component={Page6} />
        <Route path="/page7" component={Page7} />
        <Route path="/page8" component={Page8} />
        <Route path="/page9" component={Page9} />
        <Route path="/page10" component={Page10} />
        <Route path="/page11" component={Page11} />
        <Route path="/page12" component={Page12} />
        <Route path="/page13" component={Page13} />
        <Route path="/page14" component={Page14} />
        <Route path="/page15" component={Page15} />
        <Route path="/page16" component={Page16} />
        <Route path="/page17" component={Page17} />
        <Route path="/page18" component={Page18} />
        <Route path="/page19" component={Page19} />
        <Route path="/page20" component={Page20} />
        <Route path="/page21" component={Page21} />
        <Route path="/page22" component={Page22} />
        <Route path="/page23" component={Page23} />
        <Route path="/page24" component={Page24} />
        <Route path="/page25" component={Page25} />
        <Route path="/page26" component={Page26} />
        <Route path="/page27" component={Page27} />
        <Route path="/page28" component={Page28} />
        <Route path="/page29" component={Page29} />
        <Route path="/page30" component={Page30} />
        <Route path="/page31" component={Page31} />
        <Route path="/page32" component={Page32} />
        <Route path="/page33" component={Page33} />
        <Route path="/page34" component={Page34} />
        <Route path="/page35" component={Page35} />
        <Route path="/page36" component={Page36} />
        <Route path="/page37" component={Page37} />
        <Route path="/page38" component={Page38} />
        <Route path="/page39" component={Page39} />
        <Route path="/page40" component={Page40} />
        <Route path="/page41" component={Page41} />
        <Route path="/page42" component={Page42} />
        <Route path="/page43" component={Page43} />
        <Route path="/page44" component={Page44} />
        <Route path="/page45" component={Page45} />
        <Route path="/page46" component={Page46} />
        <Route path="/page47" component={Page47} />
        <Route path="/page48" component={Page48} />
        <Route path="/page49" component={Page49} />
        <Route path="/page50" component={Page50} />
        <Route path="/page51" component={Page51} />
        <Route path="/page52" component={Page52} />
        <Route path="/page53" component={Page53} />
        <Route path="/page54" component={Page54} />
        <Route path="/page55" component={Page55} />
        <Route path="/page56" component={Page56} />
        <Route path="/page57" component={Page57} />
        <Route path="/page58" component={Page58} />
        <Route path="/page59" component={Page59} />
        <Route path="/page60" component={Page60} />
        <Route path="/page61" component={Page61} />
        <Route path="/page62" component={Page62} />
        <Route path="/page63" component={Page63} />
        <Route path="/page64" component={Page64} />
        <Route path="/page65" component={Page65} />
        <Route path="/page66" component={Page66} />
        <Route path="/page67" component={Page67} />
        <Route path="/page68" component={Page68} />
        <Route path="/page69" component={Page69} />
        <Route path="/page70" component={Page70} />
        <Route path="/page71" component={Page71} />
        <Route path="/page72" component={Page72} />
        <Route path="/page73" component={Page73} />
        <Route path="/page74" component={Page74} />
        <Route path="/page75" component={Page75} />
        <Route path="/page76" component={Page76} />
        <Route path="/search" component={Search} />
        <Route path="/tags" component={TagsIndex} />
        <Route path="/tag/:tag" component={TagResults} />
      </Switch>
    </Suspense>
  );
}

export default App;
