param (
	[string]$Output = "structure.txt",
	[string]$Path = "."
)

function Show-Tree {
	param (
		[string]$Path,
		[string]$Indent = ""
	)

	$exclude = @("node_modules", ".vite", ".bin", "dist", "build", "out", "target", "vendor", ".git")

	$items = Get-ChildItem -LiteralPath $Path | Where-Object {
		$exclude -notcontains $_.Name
	} | Sort-Object @{Expression = { $_.PSIsContainer }; Descending = $true }, Name

	$count = $items.Count

	for ($i = 0; $i -lt $count; $i++) {
		$item = $items[$i]
		$isLast = ($i -eq $count - 1)

		$prefix = if ($isLast) { "+-- " } else { "|-- " }

		$line = "$Indent$prefix$($item.Name)"
		Write-Output $line

		if ($item.PSIsContainer) {
			$newIndent = if ($isLast) { "$Indent    " } else { "$Indent|   " }
			Show-Tree -Path $item.FullName -Indent $newIndent
		}
	}
}

Show-Tree -Path $Path | Out-File -Encoding utf8 $Output

Write-Host "Structure written to $Output"