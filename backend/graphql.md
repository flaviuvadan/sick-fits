# GraphQL notes (module 3/intro to GraphQL)
A specification built to implement both a server in GraphQL to server and be able to fetch client data. 
Agnostic to programming language. 

GraphQL is a SPEC (specification). GraphQL (in a sense) intends to replace REST or can be set up to sit in front of 
a REST API that will proxy data in between.

GraphQL is a single end-point that one hits (vs. typical REST APIs, which would have to be hit individually).
With GraphQL, one can have a single query requesting a particular set of data that can be queried instead of 
multiple requests for specific data (similar to returning a constant API response that can be plucked).

GraphQL is a typed language - one has to define what everything is (e.g field types on an object's type).
It does not support sorting, filtering, etc. It only supports mutations, insertions, and deletions. 

By itself, GraphQL is not a replacement for typical databases; it is a standard for requesting data.
 