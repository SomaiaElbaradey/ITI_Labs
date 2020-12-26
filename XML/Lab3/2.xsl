<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
		<xsl:template match="/">
		<table border="3">
			<tbody>
				<tr>
					<th>CD Title</th>
					<th>Artist</th>
					<th>Price</th>
					<th>Country</th>
					<th>Company</th>
					<th>Year</th>
				</tr>
					<xsl:for-each select="CATALOG/CD">
					<xsl:sort select="PRICE" data-type="number" order="descending"/>
						<tr>
							<td><xsl:value-of select="TITLE"/></td>
							<td><xsl:value-of select="ARTIST"/></td>
							<td><xsl:value-of select="PRICE"/></td>
							<td><xsl:value-of select="COUNTRY"/></td>
							<td><xsl:value-of select="COMPANY"/></td>
							<td><xsl:value-of select="YEAR"/></td>
						</tr>
				</xsl:for-each>
			</tbody>
		</table>
		</xsl:template>
</xsl:stylesheet>
