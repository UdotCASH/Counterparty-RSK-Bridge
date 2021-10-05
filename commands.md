## Commands

### Read Transaction  <br> 
` curl -X POST http://104.198.75.255:4000/api/ --user rpc:rpc --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_sends", "params": { 
                      "filters": [{"field": "destination", "op": "==", "value": "3C6vwrtJDFLhKDpnmZAzR9CNmdbUfqfR5a"}] 
                     }}'  `

### Get Running Info
```curl -X POST http://104.198.75.255:4000/api/ --user rpc:rpc --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_running_info" }'```

### Read all Balances
` curl -X POST http://104.198.75.255:4000/api/ --user rpc:rpc -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_balances", "params": {"filters": [{"field": "address", "op": "==", "value": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv"}], "filterop": "and" }, "jsonrpc": "2.0", "id": 0 }' `

* using coindaddy server <br>
 ``` curl -X POST http://public.coindaddy.io:4000/api/ --user rpc:1234 -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_balances", "params": {"filters": [{"field": "address", "op": "==", "value": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv"}], "filterop": "and" }, "jsonrpc": "2.0", "id": 0 }' ```

* read balances for specific asset <br>
``` curl -X POST  http://public.coindaddy.io:4000/api/ --user rpc:1234 -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_balances", "params": { "filters": [{"field": "asset", "op": "==", "value": "XCP"}, {"field": "address", "op": "==", "value": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv"}], "filterop": "and" }, "jsonrpc": "2.0", "id": 0 }'``` 
 
 return: ```{"result": [{"address": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv", "asset": "XCP", "quantity": 70150000000}], "id": 0, "jsonrpc": "2.0"} ```

### Send Transaction
```curl -X POST  http://public.coindaddy.io:4000/api/ --user rpc:1234 -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{"method": "create_send", "params": { "source": "18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "destination": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv", "asset": "XCP", "quantity": 1 }, "jsonrpc": "2.0", "id": 0 }'```

### Send Transaction with Memo

```curl -X POST  http://public.coindaddy.io:4000/api/ --user rpc:1234 -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript' --data-binary '{"method": "create_send", "params": { "source": "18VtwKsCQEoh7WbBmaPrnkmiD8mGNjM2AP", "destination": "1K2eXP3wsX4W5HjnkNKsqX1fgRPhFA5RNv", "asset": "XCP", "quantity": 1, "memo": "1234" }, "jsonrpc": "2.0", "id": 0 }' ```

### Read memo
* for specific wallet <br>
 `curl -sX POST http://public.coindaddy.io:4000/api/ --user rpc:1234 --data-binary '{ "jsonrpc": "2.0", "id": 0, "method": "get_sends", "params": { `
                     ` "filters": [{"field": "destination", "op": "==", "value": "3C6vwrtJDFLhKDpnmZAzR9CNmdbUfqfR5a"}] `
                     `}}'|jq '.memo'|xargs `

### Sign Transaction
` bitcoin-cli signrawtransactionwithkey "hex_code_from_signed_transaction" "[\"private_key\"]"`
`"0100000001fb0d29b0d8bd67fbf003fbd1b812d04a7950b6a0de76c6f14877cfc01b19d4c8000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000346a3242a28075d10da61ec5cb9b82ba1f55096786a8feaa5d762cc6758e88b87fa2b12ddcae2041f42297609d2c1523d1ec84f12894230000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000" "[\"KySMz3MKMH454tf4jMcD38RgyNj8MfGNLzgMjMf1weDAr9u2Ak9w\"]"` 

 `curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "signrawtransactionwithkey", "params": ["myhex", "[\"key1\"]"]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/`

 `curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "signrawtransactionwithkey", "params": ["0100000001fb0d29b0d8bd67fbf003fbd1b812d04a7950b6a0de76c6f14877cfc01b19d4c8000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000346a3242a28075d10da61ec5cb9b82ba1f55096786a8feaa5d762cc6758e88b87fa2b12ddcae2041f42297609d2c1523d1ec84f12894230000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000", "[\"KySMz3MKMH454tf4jMcD38RgyNj8MfGNLzgMjMf1weDAr9u2Ak9w\"]"]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/`


### Send Transaction
` bitcoin-cli sendrawtransaction hex_code_from_signed_transaction ` <br>
`bitcoin-cli sendrawtransaction "0100000001fb0d29b0d8bd67fbf003fbd1b812d04a7950b6a0de76c6f14877cfc01b19d4c8000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88acffffffff020000000000000000346a3242a28075d10da61ec5cb9b82ba1f55096786a8feaa5d762cc6758e88b87fa2b12ddcae2041f42297609d2c1523d1ec84f12894230000000000001976a914523fe1c6fa3add0eca16d3892414438d4f2c31fa88ac00000000" `

 `curl --user myusername --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "sendrawtransaction", "params": ["signedhex"]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/`

## Marketplaces 

 https://digirare.com/
 https://bitcorns.com/farms/1FZZ7aQTVh4yE4GddvVt6Ykh1ejmYEMZwz
 https://github.com/droplister/bitcorn.org/blob/master/app/Jobs/CausesPledgesJob.php

 https://opensea.io/collection/emblem-vault-matic
 https://github.com/droplister/bitcorn.org/blob/master/app/Jobs/CausesPledgesJob.php

 https://github.com/CounterpartyXCP/cips/blob/master/cip-0012.md

 https://fractional.art/vaults/0xd6242E984E6db6B5286FB2c26C69330Da639da12

 https://bitcorn.org/causes/5
 https://xcpfox.com/
 https://xcpdex.com/
