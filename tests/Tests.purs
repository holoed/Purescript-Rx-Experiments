module Main where

import Debug.Trace
import Control.Monad.State
import Control.Monad.State.Class

-- Import the library's module(s)
import Gattaca.Experiments.Rx
import Gattaca.Experiments.Utils

-- Import Test.QuickCheck, which supports property-based testing
import Test.QuickCheck

-- Main.main is the entry point of the application
--
-- In the case of the test suite, Main.main will use QuickCheck to test a collection
-- of properties that we expect of the diffs function.

toList :: forall a.Observable (State [a]) a -> [a]
toList os = execState (os |> subscribe (\x -> modify (\xs -> xs ++ [x])) (\unit -> return unit)) []
              

testObservable :: forall a.(Observable (State [a]) a -> Observable (State [a]) a) -> [a] -> [a]
testObservable f =  toObservable >>> f >>> toList
                          
main = do 
          trace "Applicative laws:"
          trace "Identity"
          quickCheck $ \ns -> let xs = ns :: [Number] in
                              testObservable (\v -> pure id <*> v) xs == xs
          trace "Composition"
          quickCheck $ \ns -> let u = toObservable [\x -> x * x, \x -> x + 5] :: Observable (State [Number]) (Number -> Number)
                                  v = toObservable [\x -> x * x * x, \x -> x / 2, \x -> x ^ 2] :: Observable (State [Number]) (Number -> Number)
                                  w = toObservable ns :: Observable (State [Number]) Number 
                                  xs = (pure (<<<)) <*> u <*> v <*> w :: Observable (State [(Number)]) Number
                                  ys = u <*> (v <*> w) :: Observable (State [(Number)]) (Number)
                             in  toList xs == toList ys
                             
                             
