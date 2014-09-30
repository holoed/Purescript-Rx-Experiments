module Gattaca.Experiments.Rx where

import Control.Monad
import Debug.Trace
import Data.Foldable
import Gattaca.Experiments.Utils

import Data.Monoid
import Control.Monad.State
import Control.Monad.State.Class

data Observer m a = Observer (a -> m Unit) 
                             (Unit -> m Unit)

data Observable m a = Observable (Observer m a -> m Unit)

create :: forall m a.(Monad m) => (Observer m a -> m Unit) -> Observable m a
create = Observable 

onNext :: forall m a.(Monad m) => a -> Observer m a -> m Unit
onNext x (Observer o _) = o x

onCompleted :: forall m a.(Monad m) => Observer m a -> m Unit
onCompleted (Observer _ c) = c unit 

subscribe :: forall m a.(Monad m) => (a -> m Unit) -> (Unit -> m Unit) -> Observable m a -> m Unit
subscribe n c (Observable os) = os (Observer n c)

filter :: forall m a.(Monad m) => (a -> Boolean) -> Observable m a -> Observable m a
filter f os = create (\o -> os |> subscribe (\x -> if (f x) then (o |> onNext x) else return unit) 
                                            (\unit -> o |> onCompleted))

toObservable :: forall m a. (Monad m) => [a] -> Observable m a
toObservable xs = create (\o -> do sequence_ ((\x -> onNext x o) <$> xs)
                                   o |> onCompleted)

toList :: forall a.Observable (State [a]) a -> [a]
toList os = execState (os |> subscribe (\x -> modify (\xs -> xs ++ [x])) (\unit -> return unit)) []


instance functorObservable :: (Monad m) => Functor (Observable m) where
  (<$>) f os = create (\o -> os |> subscribe (\x -> o |> onNext (f x)) 
                                             (\unit -> o |> onCompleted))

instance applyObservable :: (Monad m) => Apply (Observable m) where
  (<*>) fs xs = create (\o -> fs |> subscribe (\f -> xs |> subscribe (\x -> o |> onNext (f x)) 
                                                                     (\unit -> o |> onCompleted)) 
                                              (\unit -> o |> onCompleted))

instance applicativeObservable :: (Monad m) => Applicative (Observable m) where
   pure x = create (\o -> o |> onNext x) 

instance semigroupObservable :: (Monad m) => Semigroup (Observable m a) where
  (<>) xs ys = create (\o -> xs |> subscribe (\x -> o |> onNext x)
                                             (\unit -> ys |> subscribe (\x -> o |> onNext x)
                                                                       (\unit -> o |> onCompleted)))

instance monoidObservable :: (Monad m) => Monoid (Observable m a) where
    mempty = create (\o -> o |> onCompleted)

