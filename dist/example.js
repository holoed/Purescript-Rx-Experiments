var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = {
        create: function (value) {
            return value;
        }
    };
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
    function showNumberImpl(n) {  return n.toString();};
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
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
        Monad: Monad, 
        Bind: Bind, 
        Applicative: Applicative, 
        Apply: Apply, 
        Functor: Functor, 
        Show: Show, 
        unit: unit, 
        ap: ap, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        show: show, 
        showNumber: showNumber
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
    function Observer(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Observer.create = function (value0) {
        return function (value1) {
            return new Observer(value0, value1);
        };
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
    return {
        Observer: Observer, 
        subscribe: subscribe
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_RxDom = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function mouse_move(unit) {          function Observable(value0) {       this.value0 = value0;             };                                 return new Observable(                 function (o) {                       return function() {                  o.value0(42)();                    o.value1()();                     }                                });                                                                                               };
    return {
        mouse_move: mouse_move
    };
})();
var PS = PS || {};
PS.Gattaca_Experiments_Main = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Gattaca_Experiments_Rx = PS.Gattaca_Experiments_Rx;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Debug_Trace = PS.Debug_Trace;
    var Gattaca_Experiments_RxDom = PS.Gattaca_Experiments_RxDom;
    var main = Gattaca_Experiments_Rx.subscribe(Control_Monad_Eff.monadEff({}))(function (x) {
        return Debug_Trace.trace(Prelude.show(Prelude.showNumber({}))(x));
    })(function (unit) {
        return Debug_Trace.trace("complete");
    })(Gattaca_Experiments_RxDom.mouse_move(Prelude.unit));
    return {
        main: main
    };
})();
PS.Gattaca_Experiments_Main.main();