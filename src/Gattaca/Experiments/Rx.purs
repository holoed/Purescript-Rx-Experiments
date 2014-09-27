module Gattaca.Experiments.Rx where

import Control.Monad
import Debug.Trace
import Data.Foldable

data Observer m a = Observer (a -> m Unit) 
                             (Unit -> m Unit)

data Observable m a = Observable (Observer m a -> m Unit)

(|>) :: forall a b. a -> (a -> b) -> b
(|>) x f = f x

onNext :: forall m a.(Monad m) => a -> Observer m a -> m Unit
onNext x (Observer o _) = o x

onComplete :: forall m a.(Monad m) => Observer m a -> m Unit
onComplete (Observer _ c) = c unit 

subscribe :: forall m a.(Monad m) => Observer m a -> Observable m a -> m Unit
subscribe o (Observable xs) = xs o

instance functorObservable :: (Monad m) => Functor (Observable m) where
  (<$>) f (Observable xs) = 
          Observable (\o -> xs (Observer (\x -> o |> onNext (f x)) 
                                         (\unit -> o |> onComplete) ))

instance functorApply :: (Monad m) => Apply (Observable m) where
  (<*>) (Observable fs) (Observable xs) = 
        Observable (\o -> fs (Observer (\f -> xs (Observer (\x -> o |> onNext (f x)) 
                                                           (\unit -> o |> onComplete))) 
                                       (\unit -> o |> onComplete)))

instance functorApplicative :: (Monad m) => Applicative (Observable m) where
   pure x = Observable (\o -> o |> onNext x) 

filter :: forall m a.(Monad m) => (a -> Boolean) -> Observable m a -> Observable m a
filter f (Observable xs) = 
      Observable (\o -> xs (Observer (\x -> if (f x) then (o |> onNext x) else return unit) 
                                     (\unit -> o |> onComplete)))

toObservable :: forall m a. (Monad m) => [a] -> Observable m a
toObservable xs = Observable (\o -> do sequence_ ((\x -> onNext x o) <$> xs)
                                       o |> onComplete)