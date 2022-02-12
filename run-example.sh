function exists_in_list() {
    LIST=$1
    VALUE=$2
    for x in $LIST; do
        if [ "$x" = "$VALUE" ]; then
            return 0
        fi
    done
    return 1
}

function usage() {
  CODE=$1
  echo "Usage: $0 <example>"
  echo "Available examples:"
  for x in $examples_list; do
      echo "  $x"
  done
  exit "$CODE"
}

examples_list="cli main express tmp"

if [ -z "$1" ]; then
    usage 1
fi

# handle --help
if [ "$1" = "--help" ]; then
    usage 0
fi

if exists_in_list "$examples_list" "$1"; then
    deno run --allow-net --allow-read --import-map import_map.json _examples/"$1".ts
else
    echo "Example $1 not found"
    usage 2
fi

