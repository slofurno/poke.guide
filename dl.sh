#!/bin/sh
i=1
while read -r name; do
  url=http://serebii.net/pokemongo/pokemon/$(printf %03d $i).png
  echo "$url -> ./images/$name"
  curl -sL $url > ./images/$name
  i=`expr $i + 1`
done < names
