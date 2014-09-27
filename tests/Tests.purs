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
              

testObservable :: (Observable (State [Number]) Number -> Observable (State [Number]) Number) -> [Number] -> [Number]
testObservable f =  toObservable >>> f >>> toList
                          
main = do 
          trace "Applicative laws:"
          trace "Identity"
          quickCheck $ \ns -> testObservable (\v -> pure id <*> v) ns == ns
