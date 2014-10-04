var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = {
        create: function (value) {
            return value;
        }
    };
    function LT() {

    };
    LT.value = new LT();
    function GT() {

    };
    GT.value = new GT();
    function EQ() {

    };
    EQ.value = new EQ();
    function Show(show) {
        this.show = show;
    };
    function Functor($less$dollar$greater) {
        this["<$>"] = $less$dollar$greater;
    };
    function Apply($less$times$greater, __superclass_Prelude$dotFunctor_0) {
        this["<*>"] = $less$times$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    function Applicative(__superclass_Prelude$dotApply_0, pure) {
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
        this.pure = pure;
    };
    function Bind($greater$greater$eq, __superclass_Prelude$dotApply_0) {
        this[">>="] = $greater$greater$eq;
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
    };
    function Monad(__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
        this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
    };
    function Eq($div$eq, $eq$eq) {
        this["/="] = $div$eq;
        this["=="] = $eq$eq;
    };
    function Ord(__superclass_Prelude$dotEq_0, compare) {
        this["__superclass_Prelude.Eq_0"] = __superclass_Prelude$dotEq_0;
        this.compare = compare;
    };
    function showNumberImpl(n) {  return n.toString();};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function unsafeCompareImpl(lt) {  return function (eq) {    return function (gt) {      return function (x) {        return function (y) {          return x < y ? lt : x > y ? gt : eq;        };      };    };  };};
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var unsafeCompare = unsafeCompareImpl(LT.value)(EQ.value)(GT.value);
    var unit = {};
    var showNumber = function (__unused) {
        return new Show(showNumberImpl);
    };
    var show = function (dict) {
        return dict.show;
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclass_Prelude.Applicative_0"]({}));
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclass_Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var eqNumber = function (__unused) {
        return new Eq(refIneq, refEq);
    };
    var ordNumber = function (__unused) {
        return new Ord(eqNumber, unsafeCompare);
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                var _341 = compare(__dict_Ord_10)(a1)(a2);
                if (_341 instanceof LT) {
                    return true;
                };
                return false;
            };
        };
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(a)(function (_1) {
                        return $$return(__dict_Monad_14)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        Ord: Ord, 
        Eq: Eq, 
        Monad: Monad, 
        Bind: Bind, 
        Applicative: Applicative, 
        Apply: Apply, 
        Functor: Functor, 
        Show: Show, 
        unit: unit, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        ap: ap, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "<$>": $less$dollar$greater, 
        show: show, 
        showNumber: showNumber, 
        eqNumber: eqNumber, 
        ordNumber: ordNumber
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_Utils = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $bar$greater = function (x) {
        return function (f) {
            return f(x);
        };
    };
    return {
        "|>": $bar$greater
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    var applicativeEff = function (__unused) {
        return new Prelude.Applicative(applyEff, returnE);
    };
    var applyEff = function (__unused) {
        return new Prelude.Apply(Prelude.ap(monadEff({})), functorEff);
    };
    var monadEff = function (__unused) {
        return new Prelude.Monad(applicativeEff, bindEff);
    };
    var bindEff = function (__unused) {
        return new Prelude.Bind(bindE, applyEff);
    };
    var functorEff = function (__unused) {
        return new Prelude.Functor(Prelude.liftA1(applicativeEff({})));
    };
    return {
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    return {
        trace: trace
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_Rx = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Gattaca_Experiments_Utils = PS.Gattaca_Experiments_Utils;
    function Observer(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Observer.create = function (value0) {
        return function (value1) {
            return new Observer(value0, value1);
        };
    };
    function Observable(value0) {
        this.value0 = value0;
    };
    Observable.create = function (value0) {
        return new Observable(value0);
    };
    var subscribe = function (__dict_Monad_333) {
        return function (_286) {
            return function (_287) {
                return function (_288) {
                    return _288.value0(new Observer(_286, _287));
                };
            };
        };
    };
    var onNext = function (__dict_Monad_334) {
        return function (_283) {
            return function (_284) {
                return _284.value0(_283);
            };
        };
    };
    var onCompleted = function (__dict_Monad_335) {
        return function (_285) {
            return _285.value1(Prelude.unit);
        };
    };
    var create = function (__dict_Monad_337) {
        return Observable.create;
    };
    var filter = function (__dict_Monad_338) {
        return function (f) {
            return function (os) {
                return create(__dict_Monad_338)(function (o) {
                    return Gattaca_Experiments_Utils["|>"](os)(subscribe(__dict_Monad_338)(function (x) {
                        return f(x) ? Gattaca_Experiments_Utils["|>"](o)(onNext(__dict_Monad_338)(x)) : Prelude["return"](__dict_Monad_338)(Prelude.unit);
                    })(function (unit) {
                        return Gattaca_Experiments_Utils["|>"](o)(onCompleted(__dict_Monad_338));
                    }));
                });
            };
        };
    };
    var functorObservable = function (__dict_Monad_339) {
        return new Prelude.Functor(function (f) {
            return function (os) {
                return create(__dict_Monad_339)(function (o) {
                    return Gattaca_Experiments_Utils["|>"](os)(subscribe(__dict_Monad_339)(function (x) {
                        return Gattaca_Experiments_Utils["|>"](o)(onNext(__dict_Monad_339)(f(x)));
                    })(function (unit) {
                        return Gattaca_Experiments_Utils["|>"](o)(onCompleted(__dict_Monad_339));
                    }));
                });
            };
        });
    };
    return {
        Observable: Observable, 
        Observer: Observer, 
        filter: filter, 
        subscribe: subscribe, 
        onCompleted: onCompleted, 
        onNext: onNext, 
        create: create, 
        functorObservable: functorObservable
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_RxDom = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function mouse_move(unit) {                                                 return new PS.Gattaca_Experiments_Rx.Observable(                              function (o) {                                                              return function() {                                                                                                                                    window.onload = function() {                                                                                                                          var mouse_monitor = function(e) {                                             var x = e.pageX;                                                          var y = e.pageY;                                                          var t = { value0 : x, value1 : y };                                       o.value0(t)();                                                         };                                                                                                                                                   document.addEventListener('mousemove', mouse_monitor);                 };                                                                                                                                                                                                                         }                                                                       });                                                                                                                                                                                                                    };
    return {
        mouse_move: mouse_move
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_Main = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Gattaca_Experiments_Utils = PS.Gattaca_Experiments_Utils;
    var Gattaca_Experiments_RxDom = PS.Gattaca_Experiments_RxDom;
    var Gattaca_Experiments_Rx = PS.Gattaca_Experiments_Rx;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Data_Tuple = PS.Data_Tuple;
    var Debug_Trace = PS.Debug_Trace;
    var main = Gattaca_Experiments_Utils["|>"](Gattaca_Experiments_Utils["|>"](Gattaca_Experiments_Utils["|>"](Gattaca_Experiments_Utils["|>"](Gattaca_Experiments_RxDom.mouse_move(Prelude.unit))(Prelude["<$>"](Gattaca_Experiments_Rx.functorObservable(Control_Monad_Eff.monadEff({})))(function (_289) {
        return _289.value0;
    })))(Gattaca_Experiments_Rx.filter(Control_Monad_Eff.monadEff({}))(function (x) {
        return x < 200;
    })))(Prelude["<$>"](Gattaca_Experiments_Rx.functorObservable(Control_Monad_Eff.monadEff({})))(Prelude.show(Prelude.showNumber({})))))(Gattaca_Experiments_Rx.subscribe(Control_Monad_Eff.monadEff({}))(function (x) {
        return Debug_Trace.trace(x);
    })(function (unit) {
        return Debug_Trace.trace("complete");
    }));
    return {
        main: main
    };
})();
PS.Gattaca_Experiments_Main.main();