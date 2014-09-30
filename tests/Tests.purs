module Main where

import Debug.Trace

import Data.Foldable

import Data.Monoid
import Control.Monad
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

                                      
main = do trace "Functor laws:"

          trace "First Law"
          quickCheck $ \ns -> let xs = id (toObservable ns) :: Observable (State [Number]) Number
                                  ys = id <$> (toObservable ns) :: Observable (State [Number]) Number
                              in  toList xs == toList ys

          trace "Applicative laws:"

          trace "Identity"
          quickCheck $ \ns -> let v = toObservable ns :: Observable (State [Number]) Number
                                  xs = pure id <*> v :: Observable (State [Number]) Number
                              in toList v == toList xs
          trace "Composition"
          quickCheck $ \ns -> let u = toObservable [\x -> x * x, \x -> x + 5] :: Observable (State [Number]) (Number -> Number)
                                  v = toObservable [\x -> x * x * x, \x -> x / 2, \x -> x ^ 2] :: Observable (State [Number]) (Number -> Number)
                                  w = toObservable ns :: Observable (State [Number]) Number 
                                  xs = (pure (<<<)) <*> u <*> v <*> w :: Observable (State [(Number)]) Number
                                  ys = u <*> (v <*> w) :: Observable (State [(Number)]) (Number)
                             in  toList xs == toList ys

          trace "Homomorphism"
          quickCheck $ \x -> let f x = x * x + 2 * x + 1
                                 xs = (pure f) <*> (pure x) :: Observable (State [Number]) Number
                                 ys = pure (f x) :: Observable (State [Number]) Number
                             in toList xs == toList ys

          trace "Concat test"
          quickCheck $ \ns vs -> let xs = toObservable ns :: Observable (State [Number]) Number
                                     ys = toObservable vs :: Observable (State [Number]) Number
                                 in toList (xs <> ys) == ns <> vs

          trace "Semigroup test"
          quickCheck $ \ns vs ws -> let xs = toObservable ns :: Observable (State [Number]) Number
                                        ys = toObservable vs :: Observable (State [Number]) Number
                                        zs = toObservable ws :: Observable (State [Number]) Number
                                 in toList ((xs <> ys) <> zs) == toList (xs <> (ys <> zs))

          trace "Monoid test"
          quickCheck $ \ns -> let xs = toObservable ns :: Observable (State [Number]) Number
                              in toList (xs <> mempty) == toList (mempty <> xs)


          


                             
